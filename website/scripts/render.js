const React = require("react");
const { renderToString } = require("react-dom/server");
const { curiProvider } = require("@curi/react-dom");

const renderFn = require("../src/render").default;

module.exports = function render(emitted) {
  const Router = curiProvider(emitted.router);
  return {
    html: renderToString(React.createElement(Router, null, renderFn)),
    title: emitted.response.title
  };
};
