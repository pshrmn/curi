import { withLeadingSlash } from "../utils/path";

import { SessionLocation } from "@hickory/root";
import { Match, Params } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

interface MatchingRoute {
  route: PreparedRoute;
  parsed: string[];
}

let matchRoute = (route: PreparedRoute, pathname: string): MatchingRoute[] => {
  let { re, children, exact } = route.matching;
  let regExpMatch = re.exec(pathname);

  if (!regExpMatch) {
    return [];
  }

  let [matchedSegment, ...parsed] = regExpMatch;
  let matches: MatchingRoute[] = [{ route, parsed }];

  let remainder = pathname.slice(matchedSegment.length);
  if (!children.length || remainder === "") {
    return matches;
  }

  // match that ends with a strips it from the remainder
  let fullSegments = withLeadingSlash(remainder);
  for (let i = 0, length = children.length; i < length; i++) {
    let matched = matchRoute(children[i], fullSegments);
    if (matched.length) {
      return matches.concat(matched);
    }
  }

  return exact ? [] : matches;
};

let createMatch = (
  routeMatches: MatchingRoute[],
  location: SessionLocation
): Match => {
  let route = routeMatches[routeMatches.length - 1].route.public;

  return {
    route,
    match: {
      location,
      name: route.name,
      params: routeMatches.reduce(
        (params, { route, parsed }) => {
          parsed.forEach((param, index) => {
            let name = route.matching.keys[index].name;
            let fn = route.matching.parsers[name] || decodeURIComponent;
            params[name] = fn(param);
          });
          return params;
        },
        {} as Params
      )
    }
  };
};

export let matchLocation = (
  location: SessionLocation,
  routes: PreparedRoute[]
) => {
  for (let i = 0, len = routes.length; i < len; i++) {
    let routeMatches = matchRoute(routes[i], location.pathname);
    if (routeMatches.length) {
      return createMatch(routeMatches, location);
    }
  }
};
