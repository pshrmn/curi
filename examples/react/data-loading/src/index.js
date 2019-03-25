import React from "react";
import ReactDOM from "react-dom";
import { create_router_component } from "@curi/react-dom";
import { browser } from "@hickory/browser";
import { create_router } from "@curi/router";
import prefetch from "@curi/route-prefetch";

import routes from "./routes";
import App from "./components/App";

const router = create_router(browser, routes, {
  route: [prefetch()]
});
const Router = create_router_component(router);
const root = document.getElementById("root");

router.once(() => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});
