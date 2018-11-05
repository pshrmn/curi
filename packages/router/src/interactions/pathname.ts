import PathToRegexp from "path-to-regexp";
import { withLeadingSlash, join } from "../utils/path";

import { PathFunction, PathFunctionOptions } from "path-to-regexp";
import { Interaction } from "../types/interaction";
import { Route } from "../types/route";
import { Params } from "../types/response";

function generatePathname(options?: PathFunctionOptions): Interaction {
  let knownPaths: { [key: string]: string } = {};
  let cache: { [key: string]: PathFunction } = {};
  let alreadyCompiled: { [key: string]: string } = {};
  return {
    name: "pathname",
    register: (route: Route, parent: string): string => {
      const { name, path, pathname } = route;

      let base;
      if (parent && knownPaths[parent]) {
        base = knownPaths[parent];
      }
      knownPaths[name] = withLeadingSlash(base ? join(base, path) : path);
      if (pathname) {
        cache[name] = pathname;
      }
      return name;
    },
    get: (name: string, params: Params): string | void => {
      if (knownPaths[name] == null) {
        if (process.env.NODE_ENV !== "production") {
          console.error(
            `Could not generate pathname for ${name} because it is not registered.`
          );
        }
        return;
      }
      const hash = `${name}${JSON.stringify(params)}`;
      if (alreadyCompiled[hash]) {
        return alreadyCompiled[hash];
      }

      const compile = cache[name]
        ? cache[name]
        : (cache[name] = PathToRegexp.compile(knownPaths[name]));
      const output = compile(params, options);
      alreadyCompiled[hash] = output;
      return output;
    },
    reset: () => {
      knownPaths = {};
      cache = {};
      alreadyCompiled = {};
    }
  };
}

export default generatePathname;
