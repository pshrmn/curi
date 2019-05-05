import { Route } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

export default function mapRoutes(
  routes: Array<PreparedRoute>,
  map: { [key: string]: Route }
) {
  routes.forEach(route => {
    map[route.public.meta.name] = route.public;
    mapRoutes(route.children, map);
  });
  return map;
}
