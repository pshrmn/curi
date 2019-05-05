import { createRoute } from "./createRoute";
import { matchLocation } from "./matchLocation";
import mapRoutes from "./mapRoutes";
import pathname from "../interactions/pathname";
import active from "../interactions/active";

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
  interactions?: { [key: string]: Interaction };
}

export default function prepareRoutes(
  options: PrepareRoutesOptions
): RouteMatcher {
  const usedNames = new Set<string>();
  const prepared = options.routes.map(route => createRoute(route, usedNames));
  const mappedRoutes = mapRoutes(prepared, {});
  const interactions: { [key: string]: Interaction } = { pathname, active };
  for (let key in options.interactions) {
    interactions[key] = options.interactions[key];
  }

  return {
    match(location: SessionLocation) {
      return matchLocation(location, prepared);
    },
    interactions(type: string, name: string, ...rest: Array<any>) {
      if (!(type in interactions)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `Attempting to use the "${type}" interaction, but it is not registered.`
          );
        }
        return;
      }
      if (!(name in mappedRoutes)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `Attempting to use route "${name}", but no route with that name exists.`
          );
        }
        return;
      }
      return interactions[type](mappedRoutes[name], ...rest);
    }
  };
}
