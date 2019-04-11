import React from "react";
import ReactDOM from "react-dom";
import { createRouter } from "@curi/router";
import { browser } from "@hickory/browser";
import createTitleSideEffect from "@curi/side-effect-title";
import { createRouterComponent } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const setTitle = createTitleSideEffect(
  ({ response }) => `${response.title} | Side Effect Example`
);
const router = createRouter(browser, routes, {
  sideEffects: [setTitle]
});
const Router = createRouterComponent(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
