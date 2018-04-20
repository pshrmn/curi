import { join, stripLeadingSlash } from "./path";
import parseParams from "./parseParams";

import { HickoryLocation } from "@hickory/root";
import { InternalRoute, MatchingRoute, BestMatch } from "../types/route";
import { Params, RawParams, Response } from "../types/response";

function matchRoute(
  route: InternalRoute,
  pathname: string
): Array<MatchingRoute> {
  const testPath: string = stripLeadingSlash(pathname);
  const regExpMatch: RegExpMatchArray = route.pathMatching.re.exec(testPath);
  if (!regExpMatch) {
    return [];
  }

  const [matchedSegment, ...parsed] = regExpMatch;
  const params: RawParams = {};
  route.pathMatching.keys.forEach((key, index) => {
    params[key.name] = parsed[index];
  });

  let matches: Array<MatchingRoute> = [{ route, params }];

  // if there are no children routes, immediately accept the match
  if (!route.children.length) {
    return matches;
  }

  // children only need to match against unmatched segments
  const remainingSegments = testPath.slice(matchedSegment.length);
  const childrenLength = route.children.length;
  for (let i = 0; i < childrenLength; i++) {
    const matched = matchRoute(route.children[i], remainingSegments);
    if (matched.length) {
      matches = matches.concat(matched);
      break;
    }
  }

  // return matches if a child route matches or this route matches exactly
  return matches.length > 1 ||
    (route.pathMatching.mustBeExact && remainingSegments.length === 0)
    ? matches
    : [];
}

export default function matchLocation(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): BestMatch {
  let partials: Array<string> = [];
  let params: Params = {};
  let route: InternalRoute;

  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  const routeLength = routes.length;
  for (let i = 0; i < routeLength; i++) {
    const routeMatches = matchRoute(routes[i], location.pathname);
    if (routeMatches.length) {
      const bestMatch: MatchingRoute = routeMatches.pop();

      routeMatches.forEach(match => {
        partials.push(match.route.public.name);
        Object.assign(
          params,
          parseParams(match.params, match.route.paramParsers)
        );
      });

      route = bestMatch.route;
      Object.assign(params, parseParams(bestMatch.params, route.paramParsers));
      break;
    }
  }

  // start building the properties of the response object
  const base: Response = {
    location,
    key: location.key,
    params,
    name: route ? route.public.name : undefined,
    partials,
    status: route != null ? 200 : 404,
    body: undefined,
    data: undefined,
    title: ""
  };
  return { route, base };
}
