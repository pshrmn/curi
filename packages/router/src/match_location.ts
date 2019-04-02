import { with_leading_slash } from "./utils/path";

import { SessionLocation } from "@hickory/root";
import {
  PreparedRoute,
  ParamParsers,
  Params,
  IntrinsicResponse
} from "@curi/types";

interface MatchingRoute {
  route: PreparedRoute;
  params: Params;
}

interface MissMatch {
  route: undefined;
  match: undefined;
}

type RawParams = { [key: string]: string };

export interface RealMatch {
  route: PreparedRoute;
  match: IntrinsicResponse;
}

export type PossibleMatch = RealMatch | MissMatch;

function match_route(
  route: PreparedRoute,
  pathname: string
): Array<MatchingRoute> {
  const test_path: string = pathname;
  const reg_exp_match: RegExpMatchArray | null = route.path_matching.re.exec(
    test_path
  );

  if (!reg_exp_match) {
    return [];
  }

  const matched_segment = reg_exp_match[0];
  const parsed = reg_exp_match.slice(1);
  const params: RawParams = {};
  route.path_matching.keys.forEach((key, index) => {
    params[key.name] = parsed[index];
  });

  let matches: Array<MatchingRoute> = [{ route, params }];

  // if there are no children routes, immediately accept the match
  if (!route.children.length) {
    return matches;
  }

  // children only need to match against unmatched segments
  const remaining_segments = test_path.slice(matched_segment.length);
  if (remaining_segments !== "") {
    const children_length = route.children.length;
    // a parent that ends with a slash will have stripped the leading
    // slash from remaining segments, so re-add it
    const full_segments = with_leading_slash(remaining_segments);
    for (let i = 0; i < children_length; i++) {
      const matched = match_route(route.children[i], full_segments);
      if (matched.length) {
        matches = matches.concat(matched);
        break;
      }
    }
  }

  // return matches if a child route matches or this route matches exactly
  return matches.length > 1 ||
    (route.path_matching.exact && remaining_segments.length === 0)
    ? matches
    : [];
}

function create_match(
  route_matches: Array<MatchingRoute>,
  location: SessionLocation
): RealMatch {
  let partials: Array<string> = [];
  let params: Params = {};

  const best_match: MatchingRoute = route_matches.pop() as MatchingRoute;
  // handle ancestor routes
  route_matches.forEach(match => {
    partials.push(match.route.public.name);
    Object.assign(
      params,
      parse_params(match.params, match.route.param_parsers)
    );
  });
  // handle best match
  Object.assign(
    params,
    parse_params(best_match.params, best_match.route.param_parsers)
  );

  return {
    route: best_match.route,
    match: {
      location,
      name: best_match.route.public.name,
      params,
      partials
    }
  };
}

function parse_params(params: RawParams, fns?: ParamParsers): Params {
  if (!fns) {
    return params;
  }
  const output: Params = {};
  // For each param, attempt to parse it. However, if that
  // fails, fall back to the string value.
  for (let key in params) {
    let value = params[key];
    let fn = fns[key];
    if (fn) {
      try {
        value = fn(value);
      } catch (e) {
        console.error(e);
        value = params[key];
      }
    }
    output[key] = value;
  }
  return output;
}

export default function match_location(
  location: SessionLocation,
  routes: Array<PreparedRoute>
): PossibleMatch {
  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  const route_length = routes.length;
  for (let i = 0; i < route_length; i++) {
    const route_matches = match_route(routes[i], location.pathname);
    if (route_matches.length) {
      return create_match(route_matches, location);
    }
  }

  // no matching route
  return {
    route: undefined,
    match: undefined
  };
}
