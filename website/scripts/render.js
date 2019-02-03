const React = require("react");
const { renderToString } = require("react-dom/server");
const { curiProvider } = require("@curi/react-dom");

const App = require("../src/components/App").default;

module.exports = function render(emitted) {
  const Router = curiProvider(emitted.router);
  return {
    html: renderToString(
      React.createElement(Router, null, React.createElement(App))
    ),
    title: emitted.response.title
  };
};
