import React from "react";
import ReactDOM from "react-dom";
import { create_router } from "@curi/router";
import { browser } from "@hickory/browser";
import { parse, stringify } from "qs";
import { create_router_component } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const router = create_router(browser, routes, {
  emit_redirects: false,
  history: {
    query: { parse, stringify }
  }
});
const Router = create_router_component(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
