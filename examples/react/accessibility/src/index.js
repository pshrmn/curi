import React from "react";
import ReactDOM from "react-dom";
import { createRouter, announce } from "@curi/router";
import { browser } from "@hickory/browser";
import { createRouterComponent } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

let router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});
let Router = createRouterComponent(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
