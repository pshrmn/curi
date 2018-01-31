import Browser from "@hickory/browser";
import curi from "@curi/core";

import { baseRoutes } from "./routes";
import renderApp from "./render";

const history = Browser();
const router = curi(history, baseRoutes);
router.respond(renderApp);
