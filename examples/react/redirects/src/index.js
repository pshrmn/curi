import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import { Browser } from "@hickory/browser";
import { parse, stringify } from "qs";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const history = Browser({
  query: { parse, stringify }
});
const router = curi(history, routes, {
  emitRedirects: false
});
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
