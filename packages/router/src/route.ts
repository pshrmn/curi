import PathToRegexp from "path-to-regexp";

import once from "./utils/once";

import { RouteDescriptor, InternalRoute } from "./types/route";
import { Key } from "path-to-regexp";

const createRoute = (options: RouteDescriptor): InternalRoute => {
  const {
    name,
    pathOptions = {},
    children: descriptorChildren = [],
    response,
    on = {},
    extra,
    params: paramParsers
  } = options;
  let { path } = options;

  if (path.charAt(0) === "/") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Route paths cannot start with a forward slash (/). (Received "${path}")`
      );
    }
    path = path.slice(1);
  }

  // end defaults to true, so end has to be hardcoded for it to be false
  // set this before setting pathOptions.end for children
  const mustBeExact = pathOptions.end == null || pathOptions.end;

  let children: Array<InternalRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  // create route objects for each child
  if (descriptorChildren.length) {
    pathOptions.end = false;
    children = descriptorChildren.map(createRoute);
  }

  // keys is populated by PathToRegexp
  const keys: Array<Key> = [];
  const re = PathToRegexp(path, keys, pathOptions);

  return {
    public: {
      name,
      path: path,
      keys: keys.map(key => key.name),
      on: {
        initial: on.initial && once(on.initial),
        every: on.every
      },
      extra
    },
    pathMatching: {
      re,
      keys,
      mustBeExact
    },
    sync: !(on.initial || on.every),
    response,
    children,
    paramParsers
  };
};

export default createRoute;
