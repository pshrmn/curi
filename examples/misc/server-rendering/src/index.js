import React from "react";
import ReactDOM from "react-dom";
import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import { createRouterComponent } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const router = createRouter(browser, routes, {
  invisibleRedirects: true
});
const Router = createRouterComponent(router);

router.once(() => {
  ReactDOM.hydrate(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});
