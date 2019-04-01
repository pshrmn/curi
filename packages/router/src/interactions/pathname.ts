import PathToRegexp from "path-to-regexp";
import { with_leading_slash, join } from "../utils/path";

import { PathFunction, PathFunctionOptions } from "path-to-regexp";
import { Interaction, Route, Params } from "@curi/types";

function generate_pathname(options?: PathFunctionOptions): Interaction {
  let known_paths: { [key: string]: string } = {};
  let cache: { [key: string]: PathFunction } = {};
  let already_compiled: { [key: string]: string } = {};
  return {
    name: "pathname",
    register: (route: Route, parent: string): string => {
      const { name, path, pathname } = route;

      let base;
      if (parent && known_paths[parent]) {
        base = known_paths[parent];
      }
      known_paths[name] = with_leading_slash(base ? join(base, path) : path);
      if (pathname) {
        cache[name] = pathname;
      }
      return name;
    },
    get: (name: string, params: Params): string | void => {
      if (known_paths[name] == null) {
        if (process.env.NODE_ENV !== "production") {
          console.error(
            `Could not generate pathname for ${name} because it is not registered.`
          );
        }
        return;
      }
      const hash = `${name}${JSON.stringify(params)}`;
      if (already_compiled[hash]) {
        return already_compiled[hash];
      }

      const compile = cache[name]
        ? cache[name]
        : (cache[name] = PathToRegexp.compile(known_paths[name]));
      const output = compile(params, options);
      already_compiled[hash] = output;
      return output;
    },
    reset: () => {
      known_paths = {};
      cache = {};
      already_compiled = {};
    }
  };
}

export default generate_pathname;
