import { PathnamesConfiguration } from "./types";

import { pathname } from "@curi/router";

export default function pathnames(
  config: PathnamesConfiguration
): Array<string> {
  const { routes, pages } = config;
  return pages.map(page => {
    const route = routes.route(page.name);
    if (!route) {
      throw new Error(
        `Failed to create pathname for route "${
          page.name
        }" because it does not exist.`
      );
    }
    return pathname(route, page.params);
  });
}
