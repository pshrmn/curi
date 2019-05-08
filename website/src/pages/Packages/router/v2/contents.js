import { meta as createRouterMeta } from "./api/createRouter";
import { meta as prepareRoutesMeta } from "./api/prepareRoutes";
import { meta as RoutePropertiesMeta } from "./api/route-objects";
import { meta as announceMeta } from "./api/announce";
import { meta as scrollMeta } from "./api/scroll";
import { meta as titleMeta } from "./api/title";

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
      RoutePropertiesMeta,
      announceMeta,
      scrollMeta,
      titleMeta
    ]
  }
];
