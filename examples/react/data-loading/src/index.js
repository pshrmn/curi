import React from "react";
import ReactDOM from "react-dom";
import { createRouterComponent } from "@curi/react-dom";
import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import prefetch from "@curi/route-prefetch";

import routes from "./routes";
import App from "./components/App";

const router = createRouter(browser, routes, {
  route: [prefetch()]
});
const Router = createRouterComponent(router);
const root = document.getElementById("root");

router.once(() => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});
