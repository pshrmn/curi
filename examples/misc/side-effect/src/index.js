import Browser from "@hickory/browser";
import curi from "@curi/core";
import createTitleSideEffect from "@curi/side-effect-title";

import routes from "./routes";
import renderApp from "./render";

const setTitle = createTitleSideEffect({ suffix: "| Middleware Example" });
const history = Browser();
const router = curi(history, routes, {
  sideEffects: [{ fn: setTitle }]
});
router.respond(renderApp);
