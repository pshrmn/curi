import React from "react";
import ReactDOM from "react-dom";
import { browser } from "@hickory/browser";
import { createRouter, announce } from "@curi/router";
import { createRouterComponent } from "@curi/react-dom";

import routes from "./routes";
import Controls from "./components/Controls";
import App from "./components/App";

const router = createRouter(browser, routes, {
  sideEffects: [
    announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});
const Router = createRouterComponent(router);

router.once(() => {
  ReactDOM.render(
    <Router>
      <Controls />
      <App />
    </Router>,
    document.getElementById("root")
  );
});
