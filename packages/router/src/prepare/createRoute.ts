import PathToRegexp from "path-to-regexp";
import { withLeadingSlash, join } from "../utils/path";

import { Key } from "path-to-regexp";

import { RouteDescriptor, Params } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

export function createRoute(
  props: RouteDescriptor,
  usedNames: Set<string>,
  parentPath?: string
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

  let fullPath = withLeadingSlash(join(parentPath || "", props.path));

  const { match: matchOptions = {}, compile: compileOptions = {} } =
    props.pathOptions || {};
  // end must be false for routes with children, but we want to track its original value
  const exact = matchOptions.end == null || matchOptions.end;

  let children: Array<PreparedRoute> = [];
  if (props.children && props.children.length) {
    matchOptions.end = false;
    children = props.children.map((child: RouteDescriptor) => {
      return createRoute(child, usedNames, fullPath);
    });
  }

  const keys: Array<Key> = [];
  const re = PathToRegexp(withLeadingSlash(props.path), keys, matchOptions);

  const compiled = PathToRegexp.compile(fullPath);

  return {
    public: {
      name: props.name,
      path: props.path,
      keys: keys.map(key => key.name),
      resolve: props.resolve,
      respond: props.respond,
      extra: props.extra,
      pathname(params?: Params) {
        return compiled(params, compileOptions);
      }
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
