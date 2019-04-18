const VERSION = "16.8.6";
const dev = process.env.NODE_ENV !== "production";
const REACT_BUILD = dev ? "react.development.js" : "react.production.min.js";
const REACT_DOM_BUILD = dev
  ? "react-dom.development.js"
  : "react-dom.production.min.js";

module.exports = function insert(html, title, description) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="Description" content="${description}">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | Curi Documentation</title>
    <link href="https://fonts.googleapis.com/css?family=Zilla+Slab:300,400" rel="stylesheet">
    <link href="/static/css/prism.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${html}</div>
    <script src="https://unpkg.com/react@${VERSION}/umd/${REACT_BUILD}"></script>
    <script src="https://unpkg.com/react-dom@${VERSION}/umd/${REACT_DOM_BUILD}"></script>
    <script src="/static/js/prism.js"></script>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>
`;
};
