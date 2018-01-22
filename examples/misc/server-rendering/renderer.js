import React from "react";
import { renderToString } from "react-dom/server";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import { CuriBase } from "@curi/react";
import routes from "./src/routes";
import renderFunction from "./src/renderFunction";

export default function(req, res) {
  const history = InMemory({ locations: [req.url] });
  const router = curi(history, routes);

  router.respond(
    (response, navigation) => {
      const markup = renderToString(
        <CuriBase
          router={router}
          response={response}
          navigation={navigation}
          render={renderFunction}
        />
      );
      res.send(renderFullPage(markup));
    },
    { once: true }
  );
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
        <script src="https://unpkg.com/react@16.0.0/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.production.min.js"></script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
  `;
}
