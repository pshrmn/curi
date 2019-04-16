import { createRoute } from "./createRoute";
import { matchLocation } from "./matchLocation";
import registerRoutes from "./registerRoutes";
import pathname from "../interactions/pathname";
import active from "../interactions/active";

import { SessionLocation } from "@hickory/root";
import { Key } from "path-to-regexp";
import {
  RouteMatcher,
  RouteDescriptor,
  Interaction,
  Interactions,
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
  interactions?: Array<Interaction>;
}

export default function prepareRoutes(
  options: PrepareRoutesOptions
): RouteMatcher {
  const { routes, interactions = [] } = options;
  const usedNames = new Set<string>();
  const prepared = routes.map(route => createRoute(route, usedNames));
  const interactionGetters: Interactions = {};
  [pathname(), active(), ...interactions].map(interaction => {
    interactionGetters[interaction.name] = interaction.get;
    registerRoutes(prepared, interaction);
  });

  return {
    match(location: SessionLocation) {
      return matchLocation(location, prepared);
    },
    interactions: interactionGetters
  };
}
