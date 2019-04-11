import PathToRegexp from "path-to-regexp";
import { withLeadingSlash, join } from "./utils/path";

import { Key } from "path-to-regexp";
import {
  PreparedRoute,
  PreparedRoutes,
  RouteDescriptor,
  Params
} from "@curi/types";

export default function prepareRoutes(
  userRoutes: Array<RouteDescriptor>
): PreparedRoutes {
  const used: Set<string> = new Set();
  return userRoutes.map(route => {
    return createRoute(route as RouteDescriptor, null, used);
  });
}

const createRoute = (
  options: RouteDescriptor,
  parentPath: string | null,
  used: Set<string>
): PreparedRoute => {
  if (process.env.NODE_ENV !== "production") {
    if (used.has(options.name)) {
      throw new Error(
        `Multiple routes have the name "${
          options.name
        }". Route names must be unique.`
      );
    }
    used.add(options.name);
  }

  const path = options.path;
  if (process.env.NODE_ENV !== "production") {
    if (path.charAt(0) === "/") {
      throw new Error(
        `Route paths cannot start with a forward slash (/). (Received "${path}")`
      );
    }
  }
  let fullPath = withLeadingSlash(join(parentPath || "", path));

  const { match: matchOptions = {}, compile: compileOptions = {} } =
    options.pathOptions || {};
  // end defaults to true, so end has to be hardcoded for it to be false
  // set this resolve setting pathOptions.end for children
  const exact = matchOptions.end == null || matchOptions.end;

  let children: Array<PreparedRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  // create route objects for each child
  if (options.children && options.children.length) {
    matchOptions.end = false;
    children = options.children.map(child => {
      return createRoute(child, fullPath, used);
    });
  }

  // keys is populated by PathToRegexp
  const keys: Array<Key> = [];
  // path is compiled with a leading slash
  // for optional initial params
  const re = PathToRegexp(withLeadingSlash(path), keys, matchOptions);

  const compiled = PathToRegexp.compile(fullPath);

  return {
    public: {
      name: options.name,
      path: path,
      keys: keys.map(key => key.name),
      resolve: options.resolve,
      extra: options.extra,
      pathname(params?: Params) {
        return compiled(params, compileOptions);
      }
    },
    pathMatching: {
      re,
      keys,
      exact
    },
    sync: options.resolve === undefined,
    response: options.response,
    children,
    paramParsers: options.params
  };
};
