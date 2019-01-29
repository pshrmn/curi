import { meta as curiMeta } from "./curi";
import { meta as prepareRoutesMeta } from "./prepareRoutes";
import { meta as RoutePropertiesMeta } from "./route-properties";

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
    children: [curiMeta, prepareRoutesMeta, RoutePropertiesMeta]
  }
];
