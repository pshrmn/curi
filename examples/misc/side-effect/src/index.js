import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { CuriBase } from "@curi/react";
import createTitleSideEffect from "@curi/side-effect-title";

import routes from "./routes";
import renderFunction from "./renderFunction";

const setTitle = createTitleSideEffect({ suffix: "| Middleware Example" });
const history = Browser();
const router = curi(history, routes, {
  sideEffects: [{ fn: setTitle }]
});
const root = document.getElementById("root");

router.respond((response, navigation) => {
  ReactDOM.render(
    <CuriBase
      router={router}
      response={response}
      navigation={navigation}
      render={renderFunction}
    />,
    root
  );
});
