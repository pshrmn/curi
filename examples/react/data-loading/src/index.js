import Browser from "@hickory/browser";
import curi from "@curi/core";
import NProgress from "nprogress";

import routes from "./routes";
import renderApp from "./render";

const history = Browser();
const router = curi(history, routes);
router.respond(renderApp);

// whenever we re-render, finish the progress bar
router.respond(
  () => {
    NProgress.done();
  },
  { observe: true }
);
