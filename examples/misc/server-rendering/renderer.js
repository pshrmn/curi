import React from "react";
import { renderToString } from "react-dom/server";
import { createReusable } from "@hickory/in-memory";
import { createRouter } from "@curi/router";
import { createRouterComponent } from "@curi/react-dom";
import routes from "./src/routes";
import App from "./src/components/App";

let ServerHistory = createReusable();

export default function(req, res) {
  let router = createRouter(ServerHistory, routes, {
    history: { location: req.url }
  });
  let Router = createRouterComponent(router);
  router.once(({ response }) => {
    if (response.redirect !== undefined) {
      res.redirect(302, response.redirect.pathname);
      return;
    }
    let markup = renderToString(
      <Router>
        <App />
      </Router>
    );
    res.send(renderFullPage(markup));
  });
}

function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
        <title>Curi Server Rendering</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
  `;
}
