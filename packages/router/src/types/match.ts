import { InternalRoute } from "./route";
import { Params, MatchResponseProperties } from "./response";

export interface MatchingRoute {
  route: InternalRoute;
  params: Params;
}

export interface MissMatch {
  route: undefined;
  match: undefined;
}

export interface Match {
  route: InternalRoute;
  match: MatchResponseProperties;
}

export type PossibleMatch = Match | MissMatch;
