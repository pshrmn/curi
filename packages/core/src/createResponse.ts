import { HickoryLocation, ToArgument } from '@hickory/root';

import matchRoute from './utils/match';
import parseParams from './utils/parseParams';
import routeProperties from './utils/routeProperties';

import { InternalRoute, Match } from './types/route';
import {
  Response,
  PendingResponse,
  ResponseProps,
  Params
} from './types/response';

export default function createResponse(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): Promise<PendingResponse> {
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
    title: ''
  };

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
      return {
        route,
        props,
        error: null,
        resolved: { initial, every }
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
