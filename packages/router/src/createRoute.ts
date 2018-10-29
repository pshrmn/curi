import PathToRegexp from "path-to-regexp";

import { withLeadingSlash, join } from "./utils/path";

import { RouteDescriptor, CompiledRoute } from "./types/route";
import { Key } from "path-to-regexp";

const createRoute = (
  options: RouteDescriptor,
  parentPath: string | null,
  usedNames: Set<string>
): CompiledRoute => {
  if (usedNames.has(options.name)) {
    throw new Error(
      `Multiple routes have the name "${
        options.name
      }". Route names must be unique.`
    );
  }
  usedNames.add(options.name);

  let path = options.path;

  if (path.charAt(0) === "/") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Route paths cannot start with a forward slash (/). (Received "${path}")`
      );
    }
    path = path.slice(1);
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

  const resolve = options.resolve || {};

  return {
    public: {
      name: options.name,
      path: path,
      keys: keys.map(key => key.name),
      resolve,
      extra: options.extra,
      pathname
    },
    pathMatching: {
      re,
      keys,
      mustBeExact
    },
    sync: !Object.keys(resolve).length,
    response: options.response,
    children,
    paramParsers: options.params
  };
};

export default createRoute;
