import { createRoute } from "./createRoute";
import { matchLocation } from "./matchLocation";

import { SessionLocation } from "@hickory/root";
import { Key } from "path-to-regexp";
import {
  RouteMatcher,
  RouteDescriptor,
  Interaction,
  Route,
  ParamParsers
} from "@curi/types";

export interface PreparedRoute {
  public: Route;
  children: Array<PreparedRoute>;
  matcher: {
    exact: boolean;
    re: RegExp;
    keys: Array<Key>;
    parsers?: ParamParsers;
  };
}

export interface PrepareRoutesOptions {
  routes: Array<RouteDescriptor>;
}

export default function prepareRoutes(
  options: PrepareRoutesOptions
): RouteMatcher {
  const mappedRoutes: { [key: string]: Route } = {};
  const prepared = options.routes.map(route =>
    createRoute(route, mappedRoutes)
  );

  return {
    match(location: SessionLocation) {
      return matchLocation(location, prepared);
    },
    route(name: string) {
      if (process.env.NODE_ENV !== "production" && !(name in mappedRoutes)) {
        console.warn(
          `Attempting to use route "${name}", but no route with that name exists.`
        );
      }
      return mappedRoutes[name];
    }
  };
}
