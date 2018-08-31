import PathToRegexp, {
  PathFunction,
  PathFunctionOptions
} from "path-to-regexp";
import { withLeadingSlash, join } from "../utils/path";

import { Interaction } from "../types/interaction";
import { Route } from "../types/route";
import { Params } from "../types/response";

function generatePathname(options?: PathFunctionOptions): Interaction {
  let knownPaths: { [key: string]: string } = {};
  let cache: { [key: string]: PathFunction } = {};

  return {
    name: "pathname",
    register: (route: Route, parent: string): string => {
      const { name, path } = route;
      if (knownPaths[name] !== undefined) {
        console.warn(
          'A route with the name "' +
            name +
            '" already exists. Each route should' +
            "have a unique name. By registering a route with a name that already exists, " +
            "you are overwriting the existing one. This may break your application."
        );
      }

      let base;
      if (parent && knownPaths[parent]) {
        base = knownPaths[parent];
      }
      knownPaths[name] = withLeadingSlash(base ? join(base, path) : path);
      return name;
    },
    get: (name: string, params: Params): string | void => {
      if (knownPaths[name] == null) {
        console.error(
          `Could not generate pathname for ${name} because it is not registered.`
        );
        return;
      }
      const compile = cache[name]
        ? cache[name]
        : (cache[name] = PathToRegexp.compile(knownPaths[name]));
      return compile(params, options);
    },
    reset: () => {
      knownPaths = {};
      cache = {};
    }
  };
}

export default generatePathname;
