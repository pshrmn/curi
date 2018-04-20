import matchLocation from "./utils/match";
import routeProperties from "./utils/routeProperties";

import { HickoryLocation, ToArgument } from "@hickory/root";
import { InternalRoute, MatchingRoute } from "./types/route";
import {
  Response,
  PendingResponse,
  ResponseProps,
  Params
} from "./types/response";

export function createResponse(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): PendingResponse {
  return {
    ...matchLocation(location, routes),
    resolved: null,
    error: null
  };
}

export function asyncCreateResponse(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): Promise<PendingResponse> {
  const { route, props } = matchLocation(location, routes);
  return resolveRoute(route, props);
}

/*
 * This will call any initial/every match functions for the matching route
 */
function resolveRoute(
  route: InternalRoute,
  props: ResponseProps
): Promise<PendingResponse> {
  if (!route) {
    return Promise.resolve({
      route,
      props
    });
  }
  const { match } = route.public;
  return Promise.all([
    match.initial ? match.initial() : undefined,
    match.every ? match.every(routeProperties(route, props)) : undefined
  ]).then(
    ([initial, every]) => {
      const resolved =
        !match.initial && !match.every ? null : { initial, every };
      return {
        route,
        props,
        error: null,
        resolved
      };
    },
    err => {
      // when there is an uncaught error, set it on the response
      return {
        route,
        props,
        error: err,
        resolved: null
      };
    }
  );
}
