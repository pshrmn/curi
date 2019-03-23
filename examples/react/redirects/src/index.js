import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import { Browser } from "@hickory/browser";
import { parse, stringify } from "qs";
import { create_router_component } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const history = Browser({
  query: { parse, stringify }
});
const router = curi(Browser, routes, {
  emitRedirects: false
});
const Router = create_router_component(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
