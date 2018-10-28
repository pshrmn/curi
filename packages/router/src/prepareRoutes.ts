import createRoute from "./createRoute";

import {
  UserRoutes,
  CompiledRoute,
  RouteDescriptor,
  CompiledRouteArray
} from "./types/route";

export default function prepareRoutes(
  userRoutes: UserRoutes
): CompiledRouteArray {
  return privatePrepareRoutes(userRoutes);
}

export function privatePrepareRoutes(
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

import { curi, prepareRoutes } from "@curi/router";

const routes = prepareRoutes([...]);
const router = curi(history, routes);`);
        hasWarned = true;
      }
    }
    return createRoute(route as RouteDescriptor);
  });
}
