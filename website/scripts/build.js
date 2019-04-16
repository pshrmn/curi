require("@babel/register");
const start = new Date();
const path = require("path");
const { staticFiles } = require("@curi/static");

const render = require("./render");
const pages = require("./pages");

const routes = require("../src/routes").default;

const OUTPUT_DIR = path.join(__dirname, "..", "gh-pages");

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
    routes
  },
  output: {
    dir: OUTPUT_DIR,
    render
  }
}).then(logResults);
