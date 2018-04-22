import { InternalRoute } from "./route";
import { Params, MissResponse, GenericResponse } from "./response";
export interface MatchingRoute {
    route: InternalRoute;
    params: Params;
}
export interface MissMatch {
    route: undefined;
    response: MissResponse;
}
export interface BestMatch {
    route: InternalRoute;
    response: GenericResponse;
}
export declare type Match = MissMatch | BestMatch;
