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
    <link href="/static/css/index.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${markup.html}</div>
    <script src="https://cdn.polyfill.io/v2/polyfill.js?features=Object.assign"></script>
    <script src="https://unpkg.com/react@16.6.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16.6.0/umd/react-dom.production.min.js"></script>
    <script src="/static/js/prism.js"></script>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>
`;
};
