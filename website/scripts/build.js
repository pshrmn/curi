require("@babel/register");
let start = new Date();
let path = require("path");
let { staticFiles } = require("@curi/static");

let render = require("./render");
let pages = require("./pages");

let routes = require("../src/routes").default;

let OUTPUT_DIR = path.join(__dirname, "..", "gh-pages");

function stringifyResult(result) {
  return result.success
    ? `✔ ${result.pathname}`
    : `✖ ${result.pathname} (${result.error.message})`;
}

function logResults(results) {
  let end = new Date();

  let { successes, failures } = results.reduce(
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

  let successOutput = successes.map(stringifyResult).join("\n");
  let failureOutput = failures.map(stringifyResult).join("\n");
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
