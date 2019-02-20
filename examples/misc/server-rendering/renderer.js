import React from "react";
import { renderToString } from "react-dom/server";
import { InMemory } from "@hickory/in-memory";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react-dom";
import routes from "./src/routes";
import App from "./src/components/App";

export default function(req, res) {
  const history = InMemory({ locations: [req.url] });
  const router = curi(history, routes, {
    automaticRedirects: false
  });
  const Router = curiProvider(router);
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
