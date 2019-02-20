import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import { Browser } from "@hickory/browser";
import active from "@curi/route-active";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import App from "./components/App";

const history = Browser();

const router = curi(history, routes, {
  route: [active()]
});
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
