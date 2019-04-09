import React from "react";
import ReactDOM from "react-dom";
import { create_router_component } from "@curi/react-dom";

import router from "./router";
import App from "./components/App";

const Router = create_router_component(router);
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
      const Router = create_router_component(nextRouter);
      render(
        <Router>
          <App />
        </Router>,
        document.getElementById("root")
      );
    });
  }
}
