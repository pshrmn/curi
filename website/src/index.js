import React from "react";
import ReactDOM from "react-dom";
import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { curiProvider } from "@curi/react-dom";
import titleSideEffect from "@curi/side-effect-title";
import scrollSideEffect from "@curi/side-effect-scroll";
import ariaLiveSideEffect from "@curi/side-effect-aria-live";
import active from "@curi/route-active";
import routes from "./routes";
import renderFunction from "./render";

// This is dumb, but I haven't figured out how to get
// Webpack to hoist these modules automatically and they
// were creating a ton of duplicate code...
import { Section } from "./components/layout/Sections";
import CodeSandboxDemo from "./components/CodeSandboxDemo";
import APIBlock from "./components/package/APIBlock";
import About from "./components/package/About";

const setTitle = titleSideEffect(
  ({ response }) => `${response.title} | Curi Documentation`
);
const scrollTo = scrollSideEffect();
const announce = ariaLiveSideEffect(
  ({ response }) => `Navigated to ${response.title}`
);

const history = Browser();

const router = curi(history, routes, {
  route: [active()],
  sideEffects: [setTitle, scrollTo, announce],
  emitRedirects: false
});
const Router = curiProvider(router);

if (process.env.NODE_ENV !== "production") {
  router.once(() => {
    ReactDOM.render(
      <Router>{renderFunction}</Router>,
      document.getElementById("root")
    );
  });

  if (module.hot) {
    module.hot.accept("./routes", () => {
      const nextRoutes = require("./routes").default;
      router.refresh(nextRoutes);
    });
  }
} else {
  router.once(() => {
    ReactDOM.hydrate(
      <Router>{renderFunction}</Router>,
      document.getElementById("root")
    );
  });
}
