import curi from "@curi/router";
import InMemory from "@hickory/in-memory";

import { Params, RouteDescriptor } from "@curi/router";

export interface ParamRoute {
  name: string;
  params: Array<Params>;
}
export type RouteToMap = string | ParamRoute;

export default function(
  routes: Array<RouteDescriptor>,
  absolute: string,
  map: Array<RouteToMap>
) {
  const history = InMemory();
  const router = curi(history, routes);

  let sitemap: Array<string> = [];

  map.forEach(item => {
    if (typeof item === "string") {
      const path = router.route.pathname(item);
      sitemap.push(router.route.pathname(item));
    } else {
      const { name, params } = item;
      sitemap = sitemap.concat(
        params.map(key => router.route.pathname(name, key))
      );
    }
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
    .map(
      page =>
        `  <url>
    <loc>${absolute}${page}</loc>
  </url>`
    )
    .join("\n")}
</urlset>`;
}
