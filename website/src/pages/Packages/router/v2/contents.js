import { meta as createRouterMeta } from "./api/createRouter";
import { meta as prepareRoutesMeta } from "./api/prepareRoutes";
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
    children: [prepareRoutesMeta, createRouterMeta, RoutePropertiesMeta]
  }
];
