import { browser } from "@hickory/browser";
import { createRouter, title, scroll, announce } from "@curi/router";

import routes from "./routes";
import focus from "./effects/focus";

let router = createRouter(browser, routes, {
  sideEffects: [
    title(({ response }) => `${response.meta.title} | Curi Documentation`),
    scroll(),
    announce(({ response }) => `Navigated to ${response.meta.title}`),
    focus
  ],
  invisibleRedirects: true
});

export default router;
