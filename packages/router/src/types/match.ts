import { PreparedRoute, Params, MatchResponseProperties } from "@curi/types";

export interface MatchingRoute {
  route: PreparedRoute;
  params: Params;
}

export interface MissMatch {
  route: undefined;
  match: undefined;
}

export interface Match {
  route: PreparedRoute;
  match: MatchResponseProperties;
}

export type PossibleMatch = Match | MissMatch;
