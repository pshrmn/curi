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
  const { re, children, exact } = route.matching;
  const regExpMatch = re.exec(pathname);

  if (!regExpMatch) {
    return [];
  }

  const [matchedSegment, ...parsed] = regExpMatch;
  let matches: Array<MatchingRoute> = [{ route, parsed }];

  const remainder = pathname.slice(matchedSegment.length);
  if (!children.length || remainder === "") {
    return matches;
  }

  // match that ends with a strips it from the remainder
  const fullSegments = withLeadingSlash(remainder);
  for (let i = 0, length = children.length; i < length; i++) {
    const matched = matchRoute(children[i], fullSegments);
    if (matched.length) {
      return matches.concat(matched);
    }
  }

  return exact ? [] : matches;
}

function createMatch(
  routeMatches: Array<MatchingRoute>,
  location: SessionLocation
): Match {
  const route = routeMatches[routeMatches.length - 1].route.public;

  return {
    route,
    match: {
      location,
      name: route.name,
      params: routeMatches.reduce(
        (params, { route, parsed }) => {
          parsed.forEach((param, index) => {
            const name = route.matching.keys[index].name;
            const fn = route.matching.parsers[name] || decodeURIComponent;
            params[name] = fn(param);
          });
          return params;
        },
        {} as Params
      )
    }
  };
}
