/// <reference types="react" />
import Vue from "vue";
import { ComponentOptions, VNode } from "vue";
import { HickoryLocation } from "@hickory/root";
import { Resolved } from "@curi/core";
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
export interface PrefetchComponent extends Vue {
    match: MatchData;
    which?: WhichOnFns;
    render: (ref: React.RefObject<any>, resolved: MaybeResolved) => VNode;
}
declare const Prefetch: ComponentOptions<PrefetchComponent>;
export default Prefetch;
