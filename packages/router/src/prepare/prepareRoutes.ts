import { createRoute } from "./createRoute";
import { matchLocation } from "./matchLocation";

import { SessionLocation } from "@hickory/root";
import { Key } from "path-to-regexp";
import {
  RouteMatcher,
  RouteDescriptor,
  Route,
  ParamParsers
} from "@curi/types";

export interface PreparedRoute {
  public: Route;
  matching: {
    children: PreparedRoute[];
    exact: boolean;
    re: RegExp;
    keys: Key[];
    parsers: ParamParsers;
  };
}

let prepareRoutes = (routes: RouteDescriptor[]): RouteMatcher => {
  let mappedRoutes: { [key: string]: Route } = {};
  let prepared = routes.map(route => createRoute(route, mappedRoutes));

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
};

export default prepareRoutes;
