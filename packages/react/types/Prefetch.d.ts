/// <reference types="react" />
import React from "react";
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
export interface PrefetchProps {
    children: (ref: React.RefObject<any>) => React.ReactElement<any>;
    match: MatchData;
    which?: WhichOnFns;
    forwardedRef?: React.RefObject<any>;
}
declare const Prefetch: React.ComponentType<PrefetchProps & React.ClassAttributes<any>>;
export default Prefetch;
