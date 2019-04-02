import { SessionLocation } from "@hickory/root";
import { PreparedRoute, IntrinsicResponse } from "@curi/types";
interface MissMatch {
    route: undefined;
    match: undefined;
}
export interface RealMatch {
    route: PreparedRoute;
    match: IntrinsicResponse;
}
declare type PossibleMatch = RealMatch | MissMatch;
export declare function match_location(location: SessionLocation, routes: Array<PreparedRoute>): PossibleMatch;
export declare function is_real_match(match: PossibleMatch): match is RealMatch;
export {};
