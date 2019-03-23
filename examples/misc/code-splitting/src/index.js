import React from "react";
import ReactDOM from "react-dom";
import { create_router_component } from "@curi/react-dom";

import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";

import routes from "./routes";
import App from "./components/App";

const router = curi(Browser, routes);
const Router = create_router_component(router);

router.once(() => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
});
