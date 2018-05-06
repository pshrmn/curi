import Browser from "@hickory/browser";
import curi from "@curi/core";
import NProgress from "nprogress";

import routes from "./routes";
import renderApp from "./render";

const history = Browser();
function finishProgress() {
  NProgress.done();
}
const router = curi(history, routes, {
  sideEffects: [{ effect: finishProgress, after: true }]
});
