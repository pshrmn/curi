import React from "react";
import ReactDOM from "react-dom";
import { create_router } from "@curi/router";
import { browser } from "@hickory/browser";
import createTitleSideEffect from "@curi/side-effect-title";
import { create_router_component } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const setTitle = createTitleSideEffect(
  ({ response }) => `${response.title} | Side Effect Example`
);
const router = create_router(browser, routes, {
  sideEffects: [setTitle]
});
const Router = create_router_component(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
