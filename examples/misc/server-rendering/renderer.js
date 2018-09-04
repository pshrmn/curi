import React from "react";
import { renderToString } from "react-dom/server";
import InMemory from "@hickory/in-memory";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react";
import routes from "./src/routes";
import { renderResponse } from "./src/render";

export default function(req, res) {
  const history = InMemory({ locations: [req.url] });
  const router = curi(history, routes);
  const Router = curiProvider(router);
  router.respond(() => {
    const markup = renderToString(<Router>{renderResponse}</Router>);
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
