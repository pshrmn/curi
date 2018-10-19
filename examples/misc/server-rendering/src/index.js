import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import { renderResponse } from "./render";

const history = Browser();
const router = curi(history, routes, {
  emitRedirects: false
});
const Router = curiProvider(router);
const root = document.getElementById("root");

router.once(() => {
  ReactDOM.hydrate(
    <Router>{renderResponse}</Router>,
    document.getElementById("root")
  );
});
