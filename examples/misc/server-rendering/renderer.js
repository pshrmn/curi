import React from "react";
import { renderToString } from "react-dom/server";
import { create_server_history } from "@hickory/in-memory";
import { curi } from "@curi/router";
import { create_router_component } from "@curi/react-dom";
import routes from "./src/routes";
import App from "./src/components/App";

const ServerHistory = create_server_history();

export default function(req, res) {
  const router = curi(ServerHistory, routes, {
    history: { location: req.url }
  });
  const Router = create_router_component(router);
  router.once(({ response }) => {
    if (response.redirectTo !== undefined) {
      res.redirect(302, response.redirectTo.pathname);
      return;
    }
    const markup = renderToString(
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
