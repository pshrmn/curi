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
export declare function matchLocation(location: SessionLocation, routes: Array<PreparedRoute>): PossibleMatch;
export declare function isRealMatch(match: PossibleMatch): match is RealMatch;
export {};
