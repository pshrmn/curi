import React from "react";
import ReactDOM from "react-dom";
import { createRouterComponent } from "@curi/react-dom";

import router from "./router";
import App from "./components/App";

let Router = createRouterComponent(router);
let render =
  process.env.NODE_ENV !== "production" ? ReactDOM.render : ReactDOM.hydrate;

import "./index.css";

router.once(() => {
  render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept("./router", () => {
      let nextRouter = require("./router").default;
      let Router = createRouterComponent(nextRouter);
      nextRouter.once(() => {
        render(
          <Router>
            <App />
          </Router>,
          document.getElementById("root")
        );
      });
    });
  }
}
