import { meta as curiMeta } from "./api/curi";
import { meta as prepareRoutesMeta } from "./api/prepare_routes";
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
    children: [curiMeta, prepareRoutesMeta, RoutePropertiesMeta]
  }
];
