const React = require("react");
const { renderToString } = require("react-dom/server");
const { create_router_component } = require("@curi/react-dom");

const App = require("../src/components/App").default;

module.exports = function render(emitted) {
  const Router = create_router_component(emitted.router);
  return {
    html: renderToString(
      React.createElement(Router, null, React.createElement(App))
    ),
    title: emitted.response.title
  };
};
