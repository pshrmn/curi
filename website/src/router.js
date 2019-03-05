import { Browser } from "@hickory/browser";
import { curi } from "@curi/router";
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

const router = curi(Browser, routes, {
  route: [active(), prefetch()],
  sideEffects: [setTitle, scrollTo, announce],
  emitRedirects: false
});

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept("./routes", () => {
      const nextRoutes = require("./routes").default;
      router.refresh(nextRoutes);
    });
  }
}

export default router;
