import React from "react";
import { Resolved } from "@curi/router";
import { HickoryLocation } from "@hickory/root";
export declare type WhichFns = Array<string>;
export interface MatchData {
    name: string;
    params?: object;
    location?: HickoryLocation;
    partials?: Array<string>;
}
export declare type MaybeResolved = Resolved | null;
export interface PrefetchProps {
    children: (ref: React.RefObject<any>, resolved: MaybeResolved, error: any) => React.ReactElement<any>;
    match: MatchData;
    which?: WhichFns;
    forwardedRef?: React.RefObject<any>;
}
declare const Prefetch: React.ComponentType<PrefetchProps & React.ClassAttributes<any>>;
export default Prefetch;
