import { browser } from "@hickory/browser";
import { createRouter } from "@curi/router";
import titleSideEffect from "@curi/side-effect-title";
import scrollSideEffect from "@curi/side-effect-scroll";
import ariaLiveSideEffect from "@curi/side-effect-aria-live";
import active from "@curi/route-active";
import prefetch from "@curi/route-prefetch";
import routes from "./routes";

const setTitle = titleSideEffect(
  ({ response }) => `${response.title} | Curi Documentation`
);
const scrollTo = scrollSideEffect();
const announce = ariaLiveSideEffect(
  ({ response }) => `Navigated to ${response.title}`
);

const router = createRouter(browser, routes, {
  route: [active(), prefetch()],
  sideEffects: [setTitle, scrollTo, announce],
  emitRedirects: false
});

export default router;
