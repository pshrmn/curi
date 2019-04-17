import { withLeadingSlash } from "../utils/path";

import { SessionLocation } from "@hickory/root";
import { Match, Params } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

interface MatchingRoute {
  route: PreparedRoute;
  parsed: Array<string>;
}

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
  const regExpMatch = route.matcher.re.exec(pathname);

  if (!regExpMatch) {
    return [];
  }

  const [matchedSegment, ...parsed] = regExpMatch;
  let matches: Array<MatchingRoute> = [{ route, parsed }];

  const remainder = pathname.slice(matchedSegment.length);
  if (!route.children.length || remainder === "") {
    return matches;
  }

  // a parent that ends with a slash will have stripped the leading
  // slash from remaining segments, so re-add it
  const fullSegments = withLeadingSlash(remainder);
  for (let i = 0, length = route.children.length; i < length; i++) {
    const matched = matchRoute(route.children[i], fullSegments);
    if (matched.length) {
      return matches.concat(matched);
    }
  }

  return route.matcher.exact ? [] : matches;
}

function createMatch(
  routeMatches: Array<MatchingRoute>,
  location: SessionLocation
): Match {
  const partials: Array<string> = [];
  const params: Params = {};

  const best: MatchingRoute = routeMatches.pop() as MatchingRoute;
  // handle ancestor routes
  routeMatches.forEach(match => {
    partials.push(match.route.public.name);
    mergeParsedParams(match.route, params, match.parsed);
  });

  // handle best match
  mergeParsedParams(best.route, params, best.parsed);

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
  route: PreparedRoute,
  params: Params,
  parsed: Array<string>
) {
  const fns = route.matcher.parsers || {};
  for (let i = 0, len = parsed.length; i < len; i++) {
    const name = route.matcher.keys[i].name;
    const fn = fns[name] || decodeURIComponent;
    params[name] = fn(parsed[i]);
  }
}
