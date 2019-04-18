const React = require("react");
const { renderToString } = require("react-dom/server");
const { createRouterComponent } = require("@curi/react-dom");

const insert = require("./html");
const App = require("../src/components/App").default;

module.exports = function render(emitted) {
  const { response, router } = emitted;
  if (response.redirect) {
    throw new Error(`Skipping rendering ${response.location.pathname}`);
  }
  const Router = createRouterComponent(router);
  const html = renderToString(
    React.createElement(Router, null, React.createElement(App))
  );
  return insert(html, response.meta.title, response.meta.description);
};
