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

  const { match: matchOptions = {}, compile: compileOptions = {} } =
    props.pathOptions || {};
  // end must be false for routes with children, but we want to track its original value
  const exact = matchOptions.end == null || matchOptions.end;

  if (props.children && props.children.length) {
    matchOptions.end = false;
  }

  const keys: Array<Key> = [];
  const re = PathToRegexp(withLeadingSlash(props.path), keys, matchOptions);
  let keyNames = keys.map(key => key.name);
  if (parent.keys.length) {
    keyNames = parent.keys.concat(keyNames);
  }

  let children: Array<PreparedRoute> = [];
  let descendants: Array<Route> = [];
  if (props.children && props.children.length) {
    children = props.children.map((child: RouteDescriptor) => {
      return createRoute(child, map, {
        path: fullPath,
        keys: keyNames
      });
    });
    descendants = children.map(child => child.public);
  }

  const compiled = PathToRegexp.compile(fullPath);

  const route = {
    public: {
      meta: {
        name: props.name,
        keys: keyNames,
        parent: undefined,
        children: descendants
      },
      methods: {
        resolve: props.resolve,
        respond: props.respond,
        pathname(params?: Params) {
          return compiled(params, compileOptions);
        }
      },
      extra: props.extra
    },
    matcher: {
      re,
      keys,
      exact,
      parsers: props.params
    },
    children
  };

  map[props.name] = route.public;
  if (children.length) {
    children.forEach(child => {
      child.public.meta.parent = route.public;
    });
  }

  return route;
}
