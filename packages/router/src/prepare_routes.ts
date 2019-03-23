import create_route from "./create_route";

import { RouteDescriptor, CompiledRouteArray } from "./types/route";

export default function prepare_routes(
  user_routes: Array<RouteDescriptor>
): CompiledRouteArray {
  const used_names: Set<string> = new Set();
  return user_routes.map(route => {
    return create_route(route as RouteDescriptor, null, used_names);
  });
}
