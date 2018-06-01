import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { CuriProvider } from "@curi/react";
import createTitleSideEffect from "@curi/side-effect-title";
import createScrollSideEffect from "@curi/side-effect-scroll";
import active from "@curi/route-active";
import prefetch from "@curi/route-prefetch";
import routes from "./routes";
import renderFunction from "./render";

const setTitle = createTitleSideEffect({ suffix: "| Curi Documentation" });
const scrollTo = createScrollSideEffect();

const history = Browser();

const router = curi(history, routes, {
  route: [active(), prefetch()],
  sideEffects: [setTitle, scrollTo]
});

router.respond(() => {
  ReactDOM.hydrate(
    <CuriProvider router={router}>{renderFunction}</CuriProvider>,
    document.getElementById("root")
  );
});
