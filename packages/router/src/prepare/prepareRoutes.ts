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
  pathMatching: {
    exact: boolean;
    re: RegExp;
    keys: Array<Key>;
    paramParsers?: ParamParsers;
  };
}

type RouteMap = { [key: string]: Route };

export default function prepareRoutes(
  routes: Array<RouteDescriptor>,
  interactionTypes: Array<Interaction> = []
): RouteMatcher {
  const prepared = routes.map(route => createRoute(route));
  const hash: RouteMap = prepared.reduce(mapRoutes, {});
  const interactionGetters: Interactions = {};
  [pathname(), active(), ...interactionTypes].map(interaction => {
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

function mapRoutes(acc: RouteMap, curr: PreparedRoute): RouteMap {
  const route = curr.public;
  if (process.env.NODE_ENV !== "production") {
    if (route.name in acc) {
      throw new Error(
        `Multiple routes have the name "${
          route.name
        }". Route names must be unique.`
      );
    }
  }
  acc[route.name] = route;

  if (curr.children) {
    acc = curr.children.reduce(mapRoutes, acc);
  }

  return acc;
}
