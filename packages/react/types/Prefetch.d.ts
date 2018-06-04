import React from "react";
import { Resolved } from "@curi/router";
import { HickoryLocation } from "@hickory/root";
export interface WhichOnFns {
    initial?: boolean;
    every?: boolean;
}
export interface MatchData {
    name: string;
    params?: object;
    location?: HickoryLocation;
    partials?: Array<string>;
}
export declare type MaybeResolved = Resolved | null;
export interface PrefetchProps {
    children: (ref: React.RefObject<any>, resolved: MaybeResolved) => React.ReactElement<any>;
    match: MatchData;
    which?: WhichOnFns;
    forwardedRef?: React.RefObject<any>;
}
declare const Prefetch: React.ComponentType<PrefetchProps & React.ClassAttributes<any>>;
export default Prefetch;
