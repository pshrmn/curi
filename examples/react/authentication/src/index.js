import Browser from "@hickory/browser";
import curi from "@curi/core";
import { parse, stringify } from "qs";

import routes from "./routes";
import renderApp from "./render";

const history = Browser({
  query: { parse, stringify }
});
const router = curi(history, routes, {
  emitRedirects: false
});
router.respond(renderApp);
