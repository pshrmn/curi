import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { CuriProvider } from "@curi/react";
import titleSideEffect from "@curi/side-effect-title";
import scrollSideEffect from "@curi/side-effect-scroll";
import ariaLiveSideEffect from "@curi/side-effect-aria-live";
import active from "@curi/route-active";
import prefetch from "@curi/route-prefetch";
import routes from "./routes";
import renderFunction from "./render";

const setTitle = titleSideEffect({ suffix: "| Curi Documentation" });
const scrollTo = scrollSideEffect();
const announce = ariaLiveSideEffect(
  ({ response }) => `Navigated to ${response.title}`
);

const history = Browser();

const router = curi(history, routes, {
  route: [active(), prefetch()],
  sideEffects: [setTitle, scrollTo, announce]
});

router.respond(() => {
  ReactDOM.hydrate(
    <CuriProvider router={router}>{renderFunction}</CuriProvider>,
    document.getElementById("root")
  );
});
