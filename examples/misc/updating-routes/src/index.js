import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { curiProvider } from "@curi/react-dom";

import App from "./components/App";
import { baseRoutes } from "./routes";

const history = Browser();
const router = curi(history, baseRoutes);
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
