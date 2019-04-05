import PathToRegexp from "path-to-regexp";
import { with_leading_slash, join } from "./utils/path";

import { Key } from "path-to-regexp";
import { PreparedRoute, PreparedRoutes, RouteDescriptor } from "@curi/types";

export default function prepare_routes(
  user_routes: Array<RouteDescriptor>
): PreparedRoutes {
  const used_names: Set<string> = new Set();
  return user_routes.map(route => {
    return create_route(route as RouteDescriptor, null, used_names);
  });
}

const create_route = (
  options: RouteDescriptor,
  parent_path: string | null,
  used_names: Set<string>
): PreparedRoute => {
  if (process.env.NODE_ENV !== "production") {
    if (used_names.has(options.name)) {
      throw new Error(
        `Multiple routes have the name "${
          options.name
        }". Route names must be unique.`
      );
    }
    used_names.add(options.name);
  }

  const path = options.path;
  if (process.env.NODE_ENV !== "production") {
    if (path.charAt(0) === "/") {
      throw new Error(
        `Route paths cannot start with a forward slash (/). (Received "${path}")`
      );
    }
  }
  let full_path = with_leading_slash(join(parent_path || "", path));

  const path_options = options.path_options || {};
  // end defaults to true, so end has to be hardcoded for it to be false
  // set this resolve setting path_options.end for children
  const exact = path_options.end == null || path_options.end;

  let children: Array<PreparedRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  // create route objects for each child
  if (options.children && options.children.length) {
    path_options.end = false;
    children = options.children.map(child => {
      return create_route(child, full_path, used_names);
    });
  }

  // keys is populated by PathToRegexp
  const keys: Array<Key> = [];
  // path is compiled with a leading slash
  // for optional initial params
  const re = PathToRegexp(with_leading_slash(path), keys, path_options);

  return {
    public: {
      name: options.name,
      path: path,
      keys: keys.map(key => key.name),
      resolve: options.resolve,
      extra: options.extra,
      pathname: PathToRegexp.compile(full_path)
    },
    path_matching: {
      re,
      keys,
      exact
    },
    sync: options.resolve === undefined,
    response: options.response,
    children,
    param_parsers: options.params
  };
};
