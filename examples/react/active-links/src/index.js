import Browser from "@hickory/browser";
import curi from "@curi/core";
import createActiveAddon from "@curi/addon-active";

import routes from "./routes";
import renderApp from "./render";

const history = Browser();

const router = curi(history, routes, {
  addons: [createActiveAddon()]
});
router.respond(renderApp);
