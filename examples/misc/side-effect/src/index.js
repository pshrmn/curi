import React from "react";
import ReactDOM from "react-dom";
import { createRouter, title } from "@curi/router";
import { browser } from "@hickory/browser";
import { createRouterComponent } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const router = createRouter(browser, routes, {
  sideEffects: [
    title(({ response }) => `${response.meta.title} | Side Effect Example`)
  ]
});
const Router = createRouterComponent(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
