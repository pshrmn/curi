import { withLeadingSlash } from "../utils/path";

import { SessionLocation } from "@hickory/root";
import { Match, ParamParsers, Params } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

interface MatchingRoute {
  route: PreparedRoute;
  params: Params;
}

type RawParams = { [key: string]: string };

export function matchLocation(
  location: SessionLocation,
  routes: Array<PreparedRoute>
): Match | undefined {
  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  for (let i = 0, routeLength = routes.length; i < routeLength; i++) {
    const routeMatches = matchRoute(routes[i], location.pathname);
    if (routeMatches.length) {
      return createMatch(routeMatches, location);
    }
  }
}

function matchRoute(
  route: PreparedRoute,
  pathname: string
): Array<MatchingRoute> {
  const regExpMatch = route.pathMatching.re.exec(pathname);

  if (!regExpMatch) {
    return [];
  }

  const [matchedSegment, ...parsed] = regExpMatch;
  const params = route.pathMatching.keys.reduce(
    (acc, key, index) => {
      acc[key.name] = parsed[index];
      return acc;
    },
    {} as RawParams
  );

  let matches: Array<MatchingRoute> = [{ route, params }];

  // if there are no children routes, immediately accept the match
  if (!route.children.length) {
    return matches;
  }

  // children only need to match against unmatched segments
  const remainder = pathname.slice(matchedSegment.length);
  if (remainder !== "") {
    // a parent that ends with a slash will have stripped the leading
    // slash from remaining segments, so re-add it
    const fullSegments = withLeadingSlash(remainder);
    for (let i = 0, length = route.children.length; i < length; i++) {
      const matched = matchRoute(route.children[i], fullSegments);
      if (matched.length) {
        matches = matches.concat(matched);
        break;
      }
    }
  }

  // return matches if a child route matches or this route matches exactly
  return matches.length > 1 ||
    (route.pathMatching.exact && remainder.length === 0)
    ? matches
    : [];
}

function createMatch(
  routeMatches: Array<MatchingRoute>,
  location: SessionLocation
): Match {
  let partials: Array<string> = [];
  let params: Params = {};

  const best: MatchingRoute = routeMatches.pop() as MatchingRoute;
  // handle ancestor routes
  routeMatches.forEach(match => {
    partials.push(match.route.public.name);
    Object.assign(
      params,
      parseParams(match.params, match.route.pathMatching.paramParsers)
    );
  });
  // handle best match
  Object.assign(
    params,
    parseParams(best.params, best.route.pathMatching.paramParsers)
  );

  return {
    route: best.route.public,
    match: {
      location,
      name: best.route.public.name,
      params,
      partials
    }
  };
}

function parseParams(params: RawParams, fns: ParamParsers = {}): Params {
  const output: Params = {};
  for (let key in params) {
    let fn = fns[key] || decodeURIComponent;
    output[key] = fn(params[key]);
  }
  return output;
}
