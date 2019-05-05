import PathToRegexp from "path-to-regexp";
import { withLeadingSlash, join } from "../utils/path";

import { Key } from "path-to-regexp";

import { RouteDescriptor, Params } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

interface ParentData {
  path: string;
  ancestors: Array<string>;
  keys: Array<string | number>;
}

export function createRoute(
  props: RouteDescriptor,
  usedNames: Set<string>,
  parent: ParentData = {
    path: "",
    ancestors: [],
    keys: []
  }
): PreparedRoute {
  if (process.env.NODE_ENV !== "production") {
    if (usedNames.has(props.name)) {
      throw new Error(
        `Multiple routes have the name "${
          props.name
        }". Route names must be unique.`
      );
    }
    usedNames.add(props.name);

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
  let ancestors = parent.ancestors;
  let descendants: Array<string> = [];
  if (props.children && props.children.length) {
    children = props.children.map((child: RouteDescriptor) => {
      return createRoute(child, usedNames, {
        path: fullPath,
        ancestors: [...ancestors, props.name],
        keys: keyNames
      });
    });
    children.forEach(child => {
      descendants.push(child.public.meta.name);
      descendants = descendants.concat(child.public.meta.descendants);
    });
  }

  const compiled = PathToRegexp.compile(fullPath);

  return {
    public: {
      meta: {
        name: props.name,
        path: props.path,
        keys: keyNames,
        ancestors,
        descendants
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
}
