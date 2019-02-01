import createRoute from "./createRoute";

import { RouteDescriptor, CompiledRouteArray } from "./types/route";

export default function prepareRoutes(
  userRoutes: Array<RouteDescriptor>
): CompiledRouteArray {
  const usedNames: Set<string> = new Set();
  return userRoutes.map(route => {
    return createRoute(route as RouteDescriptor, null, usedNames);
  });
}
