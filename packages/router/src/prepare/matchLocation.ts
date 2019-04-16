import { withLeadingSlash } from "../utils/path";

import { SessionLocation } from "@hickory/root";
import { Match, ParamParsers, Params } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

interface MatchingRoute {
  route: PreparedRoute;
  params: RawParams;
}

type RawParams = { [key: string]: string };

export function matchLocation(
  location: SessionLocation,
  routes: Array<PreparedRoute>
): Match | undefined {
  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  for (let i = 0, len = routes.length; i < len; i++) {
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

  let matches: Array<MatchingRoute> = [];
  const remainder = pathname.slice(matchedSegment.length);
  if (route.children.length && remainder !== "") {
    // a parent that ends with a slash will have stripped the leading
    // slash from remaining segments, so re-add it
    const fullSegments = withLeadingSlash(remainder);
    for (let i = 0, length = route.children.length; i < length; i++) {
      const matched = matchRoute(route.children[i], fullSegments);
      if (matched.length) {
        matches = matched;
        break;
      }
    }
    // bail when no children match and route must be exact
    if (!matches.length && route.pathMatching.exact) {
      return [];
    }
  }

  const params = route.pathMatching.keys.reduce(
    (acc, key, index) => {
      acc[key.name] = parsed[index];
      return acc;
    },
    {} as RawParams
  );

  return [{ route, params }].concat(matches);
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
    mergeParsedParams(
      params,
      match.params,
      match.route.pathMatching.paramParsers
    );
  });

  // handle best match
  mergeParsedParams(params, best.params, best.route.pathMatching.paramParsers);

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

function mergeParsedParams(
  params: Params,
  raw: RawParams,
  fns: ParamParsers = {}
) {
  for (let key in raw) {
    let fn = fns[key] || decodeURIComponent;
    params[key] = fn(raw[key]);
  }
}
