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
export interface Match<Q> {
    route: CompiledRoute;
    match: MatchResponseProperties<Q>;
}
export declare type PossibleMatch<Q> = Match<Q> | MissMatch;
