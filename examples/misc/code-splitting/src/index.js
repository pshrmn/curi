import Browser from "@hickory/browser";
import curi from "@curi/core";

import routes from "./routes";
import renderApp from "./render";

const history = Browser();
const router = curi(history, routes);
router.respond(renderApp);
