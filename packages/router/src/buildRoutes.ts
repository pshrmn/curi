import createRoute from "./createRoute";

import {
  UserRoutes,
  CompiledRoute,
  RouteDescriptor,
  CompiledRouteArray
} from "./types/route";

export default function buildRoutes(
  userRoutes: UserRoutes
): CompiledRouteArray {
  return privateBuildRoutes(userRoutes);
}

export function privateBuildRoutes(
  userRoutes: UserRoutes,
  _privateInternalCall: boolean = false
): CompiledRouteArray {
  let hasWarned = false;
  return userRoutes.map(route => {
    if ((route as CompiledRoute).public !== undefined) {
      return route as CompiledRoute;
    }
    if (process.env.NODE_ENV !== "production") {
      if (_privateInternalCall && !hasWarned) {
        console.warn(`Deprecation Warning: You passed a plain array to your curi() call. This will be
removed in the next major version. Instead, you should pass a compiled routes array.

import { curi, buildRoutes } from "@curi/router";

const router = curi(
  history,
  buildRoutes(routes)
);

or

const routes = buildRoutes([...]);
const router = curi(history, routes);`);
        hasWarned = true;
      }
    }
    return createRoute(route as RouteDescriptor);
  });
}
