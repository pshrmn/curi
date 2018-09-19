require("@babel/register");

const path = require("path");
const React = require("react");
const { generate, serve } = require("@curi/static");
const active = require("@curi/route-active");

const render = require("./render");
const pages = require("./pages");
const insert = require("./insert");

const routes = require("../src/routes").default;

const PORT = "9000";
const OUTPUT_DIR = path.join(__dirname, "..", "gh-pages");

serve({
  port: PORT,
  routes,
  routerOptions: {
    route: [active()]
  },
  doNotRenderRedirects: true,
  render,
  insert,
  ready: () => {
    return generate(routes, pages, {
      port: PORT,
      outputDir: OUTPUT_DIR,
      outputRedirects: true
    });
  }
});
