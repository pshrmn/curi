/// <reference types="react" />
import React from "react";
import { ReactNode } from "react";
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
    children: (ref: React.RefObject<any>) => ReactNode;
    match: MatchData;
    which?: WhichOnFns;
    ref?: React.RefObject<any>;
}
declare const Prefetch: (props: PrefetchProps) => React.ReactNode;
export default Prefetch;
