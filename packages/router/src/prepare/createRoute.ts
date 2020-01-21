import PathToRegexp from "path-to-regexp";
import { withLeadingSlash, join } from "../utils/path";

import { Key } from "path-to-regexp";

import { RouteDescriptor, Params, Route } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

interface ParentData {
  path: string;
  keys: Array<string | number>;
}

export function createRoute(
  props: RouteDescriptor,
  map: { [key: string]: Route },
  parent: ParentData = {
    path: "",
    keys: []
  }
): PreparedRoute {
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

  let keys: Array<Key> = [];
  let re = PathToRegexp(withLeadingSlash(props.path), keys, matchOptions);
  let keyNames = keys.map(key => key.name);
  if (parent.keys.length) {
    keyNames = parent.keys.concat(keyNames);
  }

  let childRoutes: Array<PreparedRoute> = [];
  let children: Array<Route> = [];
  if (props.children && props.children.length) {
    childRoutes = props.children.map((child: RouteDescriptor) => {
      return createRoute(child, map, {
        path: fullPath,
        keys: keyNames
      });
    });
    children = childRoutes.map(child => child.public);
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
}
