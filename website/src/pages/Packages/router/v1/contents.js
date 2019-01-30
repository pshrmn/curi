import { meta as curiMeta } from "./api/curi";
import { meta as prepareRoutesMeta } from "./api/prepareRoutes";
import { meta as RoutePropertiesMeta } from "./api/route-properties";

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
