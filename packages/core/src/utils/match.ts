import { join, stripLeadingSlash } from "./path";
import parseParams from "./parseParams";

import { HickoryLocation } from "@hickory/root";
import { InternalRoute } from "../types/route";
import { PossibleMatch, Match, MatchingRoute } from "../types/match";
import { Params, RawParams } from "../types/response";

function matchRoute(
  route: InternalRoute,
  pathname: string
): Array<MatchingRoute> {
  const testPath: string = stripLeadingSlash(pathname);
  const regExpMatch: RegExpMatchArray | null = route.pathMatching.re.exec(
    testPath
  );
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

function createMatch(
  routeMatches: Array<MatchingRoute>,
  location: HickoryLocation
): Match {
  let partials: Array<string> = [];
  let params: Params = {};

  const bestMatch: MatchingRoute = routeMatches.pop() as MatchingRoute;
  // handle ancestor routes
  routeMatches.forEach(match => {
    partials.push(match.route.public.name);
    Object.assign(params, parseParams(match.params, match.route.paramParsers));
  });
  // handle best match
  Object.assign(
    params,
    parseParams(bestMatch.params, bestMatch.route.paramParsers)
  );

  return {
    route: bestMatch.route,
    match: {
      location,
      key: location.key as string, // fix hickory location type?
      name: bestMatch.route.public.name,
      params,
      partials
    }
  };
}

export default function matchLocation(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): PossibleMatch {
  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  const routeLength = routes.length;
  for (let i = 0; i < routeLength; i++) {
    const routeMatches = matchRoute(routes[i], location.pathname);
    if (routeMatches.length) {
      return createMatch(routeMatches, location);
    }
  }

  // no matching route
  return {
    route: undefined,
    match: undefined
  };
}
