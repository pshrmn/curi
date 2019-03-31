const dev = process.env.NODE_ENV !== "production";

const VERSION = "16.8.6";

const REACT_BUILD = dev ? "react.development.js" : "react.production.min.js";
const REACT_DOM_BUILD = dev
  ? "react-dom.development.js"
  : "react-dom.production.min.js";

module.exports = function insert(markup) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${markup.title} | Curi Documentation</title>
    <link href="https://fonts.googleapis.com/css?family=Zilla+Slab:300,400" rel="stylesheet">
    <link href="/static/css/prism.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${markup.html}</div>
    <script src="https://cdn.polyfill.io/v2/polyfill.js?features=Object.assign"></script>
    <script src="https://unpkg.com/react@${VERSION}/umd/${REACT_BUILD}"></script>
    <script src="https://unpkg.com/react-dom@${VERSION}/umd/${REACT_DOM_BUILD}"></script>
    <script src="/static/js/prism.js"></script>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>
`;
};
