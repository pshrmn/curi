import { meta as createRouterMeta } from "./api/createRouter";
import { meta as prepareRoutesMeta } from "./api/prepareRoutes";
import { meta as pathnameMeta } from "./api/pathname";
import { meta as activeMeta } from "./api/active";
import { meta as ancestorsMeta } from "./api/ancestors";
import { meta as prefetchMeta } from "./api/prefetch";
import { meta as RoutePropertiesMeta } from "./api/route-objects";

export default [
  {
    title: "Installation",
    hash: "installation"
  },
  {
    title: "About",
    hash: "about"
  },
  {
    title: "API",
    hash: "API",
    children: [
      prepareRoutesMeta,
      createRouterMeta,
      pathnameMeta,
      activeMeta,
      ancestorsMeta,
      prefetchMeta,
      RoutePropertiesMeta
    ]
  }
];
