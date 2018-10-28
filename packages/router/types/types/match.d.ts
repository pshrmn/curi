import { CompiledRoute } from "./route";
import { Params, MatchResponseProperties } from "./response";
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
export declare type PossibleMatch = Match | MissMatch;
