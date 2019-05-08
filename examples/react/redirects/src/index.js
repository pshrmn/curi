import React from "react";
import ReactDOM from "react-dom";
import { createRouter, announce } from "@curi/router";
import { browser } from "@hickory/browser";
import { parse, stringify } from "qs";
import { createRouterComponent } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const router = createRouter(browser, routes, {
  invisibleRedirects: true,
  history: {
    query: { parse, stringify }
  },
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});
const Router = createRouterComponent(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
