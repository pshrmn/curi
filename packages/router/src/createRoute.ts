import PathToRegexp from "path-to-regexp";

import { withLeadingSlash, join } from "./utils/path";

import { RouteDescriptor, CompiledRoute } from "./types/route";
import { Key } from "path-to-regexp";

const createRoute = (
  options: RouteDescriptor,
  parentPath: string | null,
  usedNames: Set<string>
): CompiledRoute => {
  if (process.env.NODE_ENV !== "production") {
    if (usedNames.has(options.name)) {
      throw new Error(
        `Multiple routes have the name "${
          options.name
        }". Route names must be unique.`
      );
    }
    usedNames.add(options.name);
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

  const pathOptions = options.pathOptions || {};
  // end defaults to true, so end has to be hardcoded for it to be false
  // set this resolve setting pathOptions.end for children
  const mustBeExact = pathOptions.end == null || pathOptions.end;

  let children: Array<CompiledRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  // create route objects for each child
  if (options.children && options.children.length) {
    pathOptions.end = false;
    children = options.children.map(child => {
      return createRoute(child, fullPath, usedNames);
    });
  }

  // keys is populated by PathToRegexp
  const keys: Array<Key> = [];
  // path is compiled with a leading slash
  // for optional initial params
  const re = PathToRegexp(withLeadingSlash(path), keys, pathOptions);

  const pathname = PathToRegexp.compile(fullPath);

  return {
    public: {
      name: options.name,
      path: path,
      keys: keys.map(key => key.name),
      resolve: options.resolve,
      extra: options.extra,
      pathname
    },
    pathMatching: {
      re,
      keys,
      mustBeExact
    },
    sync: options.resolve === undefined,
    response: options.response,
    children,
    paramParsers: options.params
  };
};

export default createRoute;
