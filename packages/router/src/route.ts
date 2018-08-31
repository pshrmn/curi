import PathToRegexp from "path-to-regexp";

import { withLeadingSlash } from "./utils/path";

import { RouteDescriptor, InternalRoute } from "./types/route";
import { Key } from "path-to-regexp";

const createRoute = (options: RouteDescriptor): InternalRoute => {
  let path = options.path;

  if (path.charAt(0) === "/") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Route paths cannot start with a forward slash (/). (Received "${path}")`
      );
    }
    path = path.slice(1);
  }

  const pathOptions = options.pathOptions || {};
  // end defaults to true, so end has to be hardcoded for it to be false
  // set this before setting pathOptions.end for children
  const mustBeExact = pathOptions.end == null || pathOptions.end;

  let children: Array<InternalRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  // create route objects for each child
  if (options.children && options.children.length) {
    pathOptions.end = false;
    children = options.children.map(createRoute);
  }

  // keys is populated by PathToRegexp
  const keys: Array<Key> = [];
  // path is compiled with a leading slash
  // for optional initial params
  const re = PathToRegexp(withLeadingSlash(path), keys, pathOptions);

  const match = options.match || {};

  return {
    public: {
      name: options.name,
      path: path,
      keys: keys.map(key => key.name),
      match,
      extra: options.extra
    },
    pathMatching: {
      re,
      keys,
      mustBeExact
    },
    sync: !Object.keys(match).length,
    response: options.response,
    children,
    paramParsers: options.params
  };
};

export default createRoute;
