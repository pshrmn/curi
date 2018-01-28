import { HickoryLocation, ToArgument } from "@hickory/root";
import PathToRegexp from "path-to-regexp";

import once from "./utils/once";

import { RouteDescriptor, InternalRoute } from "./types/route";
import { Key } from "path-to-regexp";

const createRoute = (options: RouteDescriptor): InternalRoute => {
  const {
    name,
    path,
    pathOptions = {},
    children: descriptorChildren = [],
    match = {},
    extra,
    params: paramParsers
  } = options;

  // end defaults to true, so end has to be hardcoded for it to be false
  const mustBeExact = pathOptions.end == null || pathOptions.end;

  let children: Array<InternalRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  // create route objects for each child
  if (descriptorChildren.length) {
    pathOptions.end = false;
    children = descriptorChildren.map(createRoute);
  }

  const keys: Array<Key> = [];
  const re = PathToRegexp(path, keys, pathOptions);

  return {
    public: {
      name,
      path: path,
      keys: keys.map(key => key.name),
      match: {
        initial: match.initial && once(match.initial),
        every: match.every,
        response: match.response
      },
      extra
    },
    match: {
      re,
      keys,
      mustBeExact
    },
    children,
    paramParsers
  };
};

export default createRoute;
