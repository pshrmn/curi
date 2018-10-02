import { curi } from "@curi/router";
import InMemory from "@hickory/in-memory";

// types
import { RouteDescriptor, RouterOptions } from "@curi/router";
import { PageDescriptor } from "./types";

export interface PathnamesConfiguration {
  routes: Array<RouteDescriptor>;
  pages: Array<PageDescriptor>;
  routerOptions?: RouterOptions;
}

export default function pathnames(
  config: PathnamesConfiguration
): Array<string> {
  const { routes, pages, routerOptions } = config;

  const history = InMemory();
  const router = curi(history, routes, routerOptions);

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
