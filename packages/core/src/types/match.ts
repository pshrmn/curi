import { InternalRoute } from "./route";
import { Params, GenericResponse } from "./response";

export interface MatchingRoute {
  route: InternalRoute;
  params: Params;
}

export interface MissMatch {
  route: undefined;
  response: undefined;
}

export interface Match {
  route: InternalRoute;
  response: GenericResponse;
}

export type PossibleMatch = Match | MissMatch;
