import { CompiledRoute, Params, MatchResponseProperties } from "@curi/types";

export interface MatchingRoute {
  route: CompiledRoute;
  params: Params;
}

export interface MissMatch {
  route: undefined;
  match: undefined;
}

export interface Match {
  route: CompiledRoute;
  match: MatchResponseProperties;
}

export type PossibleMatch = Match | MissMatch;
