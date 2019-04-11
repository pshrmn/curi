import { createRouter } from "@curi/router";
import { inMemory } from "@hickory/in-memory";

import { PathnamesConfiguration } from "./types";

export default function pathnames(
  config: PathnamesConfiguration
): Array<string> {
  const { routes, pages, options } = config;

  const router = createRouter(inMemory, routes, options);

  return pages.map(page => {
    const pathname = router.route.pathname(page.name, page.params);
    if (process.env.NODE_ENV !== "production") {
      if (pathname == null) {
        console.warn(
          `Failed to create page URL for "${
            page.name
          }" with params ${JSON.stringify(page.params)}`
        );
      }
    }
    return pathname;
  });
}
