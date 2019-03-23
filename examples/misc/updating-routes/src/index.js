import React from "react";
import ReactDOM from "react-dom";
import { create_router } from "@curi/router";
import { Browser } from "@hickory/browser";
import { create_router_component } from "@curi/react-dom";

import App from "./components/App";
import { baseRoutes } from "./routes";

const router = create_router(Browser, baseRoutes);
const Router = create_router_component(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
