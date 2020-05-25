import PathToRegexp from "path-to-regexp";

import { SessionLocation } from "@hickory/root";
import { Key } from "path-to-regexp";
import {
  RouteMatcher,
  RouteDescriptor,
  Route,
  ParamParsers,
  Match,
  Params
} from "@curi/types";

interface PreparedRoute {
  public: Route;
  matching: {
    children: PreparedRoute[];
    exact: boolean;
    re: RegExp;
    keys: Key[];
    parsers: ParamParsers;
  };
}

interface MatchingRoute {
  route: PreparedRoute;
  parsed: string[];
}

interface ParentData {
  path: string;
  keys: (string | number)[];
}

let withLeadingSlash = (path: string): string => {
  return path.charAt(0) === "/" ? path : "/" + path;
};

let withTrailingSlash = (path: string): string => {
  return path.charAt(path.length - 1) === "/" ? path : path + "/";
};

let join = (beginning: string, end: string): string => {
  return withTrailingSlash(beginning) + end;
};

let createRoute = (
  props: RouteDescriptor,
  map: Record<string, Route>,
  parent: ParentData = {
    path: "",
    keys: []
  }
): PreparedRoute => {
  if (process.env.NODE_ENV !== "production") {
    if (props.name in map) {
      throw new Error(
        `Multiple routes have the name "${
          props.name
        }". Route names must be unique.`
      );
    }

    if (props.path.charAt(0) === "/") {
      throw new Error(
        `Route paths cannot start with a forward slash (/). (Received "${
          props.path
        }")`
      );
    }
  }

  let fullPath = withLeadingSlash(join(parent.path, props.path));

  let { match: matchOptions = {}, compile: compileOptions = {} } =
    props.pathOptions || {};
  // end must be false for routes with children, but we want to track its original value
  let exact = matchOptions.end == null || matchOptions.end;

  if (props.children && props.children.length) {
    matchOptions.end = false;
  }

  let keys: Key[] = [];
  let re = PathToRegexp(withLeadingSlash(props.path), keys, matchOptions);
  let keyNames = keys.map(key => key.name);
  if (parent.keys.length) {
    keyNames = parent.keys.concat(keyNames);
  }

  let childRoutes: PreparedRoute[] = [];
  let children: Route[] = [];
  if (props.children) {
    for (let child of props.children) {
      let childRoute = createRoute(child, map, {
        path: fullPath,
        keys: keyNames
      });
      childRoutes.push(childRoute);
      children.push(childRoute.public);
    }
  }

  let compiled = PathToRegexp.compile(fullPath);

  let route = {
    public: {
      name: props.name,
      keys: keyNames,
      parent: undefined,
      children,
      methods: {
        resolve: props.resolve,
        respond: props.respond,
        pathname(params?: Params) {
          return compiled(params, compileOptions);
        }
      },
      extra: props.extra
    },
    matching: {
      re,
      keys,
      exact,
      parsers: props.params || {},
      children: childRoutes
    }
  };

  map[props.name] = route.public;
  if (childRoutes.length) {
    childRoutes.forEach(child => {
      child.public.parent = route.public;
    });
  }

  return route;
};

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

  // match that ends with a trailing slash strips it from the remainder
  let fullSegments = withLeadingSlash(remainder);
  for (let child of children) {
    let matched = matchRoute(child, fullSegments);
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

  let params: Params = {};
  for (let { route, parsed } of routeMatches) {
    let { keys, parsers } = route.matching;
    for (let i = 0, len = parsed.length; i < len; i++) {
      let name = keys[i].name;
      let fn = parsers[name] || decodeURIComponent;
      params[name] = fn(parsed[i]);
    }
  }

  return {
    route,
    match: {
      location,
      name: route.name,
      params
    }
  };
};

export let prepareRoutes = (routes: RouteDescriptor[]): RouteMatcher => {
  let mappedRoutes: Record<string, Route> = {};
  let prepared = routes.map(route => createRoute(route, mappedRoutes));

  return {
    match(location: SessionLocation) {
      for (let route of prepared) {
        let routeMatches = matchRoute(route, location.pathname);
        if (routeMatches.length) {
          return createMatch(routeMatches, location);
        }
      }
    },
    route(name: string) {
      if (process.env.NODE_ENV !== "production" && !(name in mappedRoutes)) {
        console.warn(
          `Attempting to use route "${name}", but no route with that name exists.`
        );
      }
      return mappedRoutes[name];
    }
  };
};
