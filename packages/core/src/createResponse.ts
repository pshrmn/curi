import matchLocation from "./utils/match";
import routeProperties from "./utils/routeProperties";

import { HickoryLocation } from "@hickory/root";
import { InternalRoute } from "./types/route";
import { Response, PendingResponse, Params } from "./types/response";

export function createResponse(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): PendingResponse {
  return {
    ...matchLocation(location, routes),
    resolved: null
  };
}

export function asyncCreateResponse(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): Promise<PendingResponse> {
  const { route, response } = matchLocation(location, routes);
  return resolveRoute(route, response);
}

/*
 * This will call any initial/every match functions for the matching route
 */
function resolveRoute(
  route: InternalRoute,
  response: Response
): Promise<PendingResponse> {
  if (!route) {
    return Promise.resolve({
      route,
      response,
      resolved: null
    });
  }
  const { on } = route.public;
  return Promise.all([
    on.initial ? on.initial() : undefined,
    on.every ? on.every(routeProperties(response)) : undefined
  ]).then(
    ([initial, every]) => {
      return {
        route,
        response,
        resolved: {
          error: null,
          initial,
          every
        }
      };
    },
    error => {
      // when there is an uncaught error, set it on the response
      return {
        route,
        response,
        resolved: {
          error,
          initial: null,
          every: null
        }
      };
    }
  );
}
