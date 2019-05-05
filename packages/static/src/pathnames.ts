import { PathnamesConfiguration } from "./types";

export default function pathnames(
  config: PathnamesConfiguration
): Array<string> {
  const { routes, pages } = config;
  return pages.map(page => {
    const pathname = routes.interactions("pathname", page.name, page.params);
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
