import { PathnamesConfiguration } from "./types";

import { pathname } from "@curi/interactions";

let pathnames = (config: PathnamesConfiguration) => {
  let { routes, pages } = config;
  return pages.map(page => {
    let route = routes.route(page.name);
    if (!route) {
      throw new Error(
        `Failed to create pathname for route "${
          page.name
        }" because it does not exist.`
      );
    }
    return pathname(route, page.params);
  });
};

export default pathnames;
