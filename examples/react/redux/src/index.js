import Browser from "@hickory/browser";
import curi from "@curi/core";
import { syncResponses } from "@curi/redux";

import store from "./reduxStuff";
import routes from "./routes";
import renderApp from "./render";

const history = Browser();
const router = curi(history, routes);

syncResponses(store, router);
router.respond(renderApp);
