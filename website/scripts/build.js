require("@babel/register");
const start = new Date();
const path = require("path");
const { staticFiles } = require("@curi/static");
const active = require("@curi/route-active");

const render = require("./render");
const pages = require("./pages");
const insert = require("./insert");

const routes = require("../src/routes").default;

const OUTPUT_DIR = path.join(__dirname, "..", "gh-pages");

function getRouterOptions() {
  return {
    route: [active()]
  };
}

function stringifyResult(result) {
  return result.success
    ? `✔ ${result.pathname}`
    : `✖ ${result.pathname} (${result.error.message})`;
}

function logResults(results) {
  const end = new Date();

  const { successes, failures } = results.reduce(
    (acc, curr) => {
      if (curr.success) {
        acc.successes.push(curr);
      } else {
        acc.failures.push(curr);
      }
      return acc;
    },
    { successes: [], failures: [] }
  );

  const successOutput = successes.map(stringifyResult).join("\n");
  const failureOutput = failures.map(stringifyResult).join("\n");
  console.log(
    `Successes: (${successes.length})
${successOutput}

Failures: (${failures.length})
${failureOutput}

Build time: ${end - start}ms`
  );
}

staticFiles({
  pages,
  fallback: {
    filename: "404.html",
    pathname: "/404"
  },
  router: {
    routes,
    getRouterOptions
  },
  output: {
    dir: OUTPUT_DIR,
    redirects: false,
    render,
    insert
  }
}).then(logResults);
