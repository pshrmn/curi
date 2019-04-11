const React = require("react");
const { renderToString } = require("react-dom/server");
const { createRouterComponent } = require("@curi/react-dom");

const App = require("../src/components/App").default;

module.exports = function render(emitted) {
  const Router = createRouterComponent(emitted.router);
  return {
    html: renderToString(
      React.createElement(Router, null, React.createElement(App))
    ),
    title: emitted.response.title
  };
};
