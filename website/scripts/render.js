let React = require("react");
let { renderToString } = require("react-dom/server");
let { createRouterComponent } = require("@curi/react-dom");

let insert = require("./html");
let App = require("../src/components/App").default;

module.exports = function render(emitted) {
  let { response, router } = emitted;
  if (response.redirect) {
    throw new Error(`Skipping rendering ${response.location.pathname}`);
  }
  let Router = createRouterComponent(router);
  let html = renderToString(
    React.createElement(Router, null, React.createElement(App))
  );
  return insert(html, response.meta.title, response.meta.description);
};
