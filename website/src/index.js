import React from "react";
import ReactDOM from "react-dom";
import { createRouterComponent } from "@curi/react-dom";

import router from "./router";
import App from "./components/App";

const Router = createRouterComponent(router);
const render =
  process.env.NODE_ENV !== "production" ? ReactDOM.render : ReactDOM.hydrate;

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
      const nextRouter = require("./router").default;
      const Router = createRouterComponent(nextRouter);
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
