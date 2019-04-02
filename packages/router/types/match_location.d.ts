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
export declare type PossibleMatch = RealMatch | MissMatch;
export default function match_location(location: SessionLocation, routes: Array<PreparedRoute>): PossibleMatch;
export {};
