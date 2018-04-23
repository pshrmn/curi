import React from "react";
import { renderToString } from "react-dom/server";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import { CuriProvider } from "@curi/react";
import active from "@curi/route-active";
import routes from "../client/routes";
import renderFunction from "../client/render";

export default function createHandler(debug = false) {
  return function(req, res) {
    const history = InMemory({
      locations: [req.url]
    });

    const router = curi(history, routes, {
      route: [active()]
    });

    router.respond(({ response }) => {
      const markup = renderToString(
        <CuriProvider router={router}>{renderFunction}</CuriProvider>
      );
      res.send(renderFullPage(markup, response.title, debug));
    });
  };
}

function renderFullPage(html, title, debug) {
  return `<!doctype html>
<html>
  <head>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | Curi Documentation</title>
    <link href="https://fonts.googleapis.com/css?family=Zilla+Slab:300,400" rel="stylesheet">
    <link href="/static/css/index.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${html}</div>
    <script src="https://unpkg.com/react@16.3.1/umd/react.${
      debug ? "development" : "production.min"
    }.js"></script>
    <script src="https://unpkg.com/react-dom@16.3.1/umd/react-dom.${
      debug ? "development" : "production.min"
    }.js"></script>
    <script src="/static/js/prism.js"></script>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>
`;
}
