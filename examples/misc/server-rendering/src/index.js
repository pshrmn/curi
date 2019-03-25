import React from "react";
import ReactDOM from "react-dom";
import { browser } from "@hickory/browser";
import { create_router } from "@curi/router";
import { create_router_component } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const router = create_router(browser, routes, {
  emit_redirects: false
});
const Router = create_router_component(router);

router.once(() => {
  ReactDOM.hydrate(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});
