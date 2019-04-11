import React from "react";
import ReactDOM from "react-dom";
import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import { createRouterComponent } from "@curi/react-dom";

import routes from "./routes";
import Controls from "./components/Controls";
import App from "./components/App";

const router = createRouter(browser, routes);
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
