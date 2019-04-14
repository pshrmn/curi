import PathToRegexp from "path-to-regexp";
import { withLeadingSlash, join } from "../utils/path";

import { Key } from "path-to-regexp";

import { RouteDescriptor, Params } from "@curi/types";

import { PreparedRoute } from "./prepareRoutes";

export function createRoute(
  props: RouteDescriptor,
  parentPath?: string
): PreparedRoute {
  const path = props.path;
  if (process.env.NODE_ENV !== "production") {
    if (path.charAt(0) === "/") {
      throw new Error(
        `Route paths cannot start with a forward slash (/). (Received "${path}")`
      );
    }
  }
  let fullPath = withLeadingSlash(join(parentPath || "", path));

  const { match: matchOptions = {}, compile: compileOptions = {} } =
    props.pathOptions || {};
  // end defaults to true, so end has to be hardcoded for it to be false
  // set this resolve setting pathOptions.end for children
  const exact = matchOptions.end == null || matchOptions.end;

  let children: Array<PreparedRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  if (props.children && props.children.length) {
    matchOptions.end = false;
  }

  // keys is populated by PathToRegexp
  const keys: Array<Key> = [];
  // path is compiled with a leading slash
  // for optional initial params
  const re = PathToRegexp(withLeadingSlash(path), keys, matchOptions);

  const compiled = PathToRegexp.compile(fullPath);

  if (props.children && props.children.length) {
    children = props.children.map((child: RouteDescriptor) => {
      return createRoute(child, fullPath);
    });
  }

  return {
    public: {
      name: props.name,
      path: path,
      keys: keys.map(key => key.name),
      resolve: props.resolve,
      extra: props.extra,
      pathname(params?: Params) {
        return compiled(params, compileOptions);
      },
      sync: props.resolve === undefined,
      response: props.response
    },
    pathMatching: {
      re,
      keys,
      exact,
      paramParsers: props.params
    },
    children
  };
}
