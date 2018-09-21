require("@babel/register");
const start = new Date();
const path = require("path");
const React = require("react");
const { staticFiles } = require("@curi/static");
const active = require("@curi/route-active");

const render = require("./render");
const pages = require("./pages");
const insert = require("./insert");

const routes = require("../src/routes").default;

const OUTPUT_DIR = path.join(__dirname, "..", "gh-pages");

staticFiles({
  routes,
  pages,
  getRouterOptions: () => ({
    route: [active()]
  }),
  render,
  insert,
  outputDir: OUTPUT_DIR,
  outputRedirects: false
}).then(results => {
  const end = new Date();
  const resultString = results
    .map(result => {
      return result.success
        ? `✔ ${result.pathname}`
        : `✖ ${result.pathname} (${result.error.message})`;
    })
    .join("\n");
  console.log(
    `${resultString}

Build time: ${end - start}ms`
  );
});
