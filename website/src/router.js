import { browser } from "@hickory/browser";
import { createRouter, title, scroll, announce } from "@curi/router";

import routes from "./routes";

const router = createRouter(browser, routes, {
  sideEffects: [
    title(({ response }) => `${response.meta.title} | Curi Documentation`),
    scroll(),
    announce(({ response }) => `Navigated to ${response.meta.title}`)
  ],
  invisibleRedirects: true
});

export default router;
