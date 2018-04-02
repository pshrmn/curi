import { HickoryLocation, ToArgument } from "@hickory/root";

import matchRoute from "./utils/match";
import parseParams from "./utils/parseParams";
import routeProperties from "./utils/routeProperties";

import { InternalRoute, Match, MatchedRoute } from "./types/route";
import {
  Response,
  PendingResponse,
  ResponseProps,
  Params
} from "./types/response";

function matchLocation(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): MatchedRoute {
  let matches: Array<Match> = [];
  let partials: Array<string> = [];
  let params: Params = {};
  let route: InternalRoute;

  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  routes.some(route => matchRoute(route, location.pathname, matches));
  if (matches.length) {
    const bestMatch: Match = matches.pop();

    matches.forEach(m => {
      partials.push(m.route.public.name);
      Object.assign(params, parseParams(m.params, m.route.paramParsers));
    });

    route = bestMatch.route;
    Object.assign(params, parseParams(bestMatch.params, route.paramParsers));
  }
  // start building the properties of the response object
  const props: ResponseProps = {
    location,
    params,
    partials,
    status: route != null ? 200 : 404,
    body: undefined,
    data: undefined,
    title: ""
  };
  return { route, props };
}

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
  return loadRoute(route, props);
}

/*
 * This will call any initial/every match functions for the matching route
 */
function loadRoute(
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
