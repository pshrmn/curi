import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { CuriBase } from "@curi/react";
import createTitleSideEffect from "@curi/side-effect-title";
import createScrollSideEffect from "@curi/side-effect-scroll";
import createActiveAddon from "@curi/addon-active";
import routes from "./routes";
import renderFunction from "./render";

const setTitle = createTitleSideEffect({ suffix: "| Curi Documentation" });
const scrollTo = createScrollSideEffect();

const history = Browser();

const router = curi(history, routes, {
  addons: [createActiveAddon()],
  sideEffects: [{ fn: setTitle }, { fn: scrollTo }]
});

router.respond((response, navigation) => {
  ReactDOM.hydrate(
    <CuriBase
      response={response}
      navigation={navigation}
      router={router}
      render={renderFunction}
    />,
    document.getElementById("root")
  );
});
