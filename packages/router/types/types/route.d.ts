import { RegExpOptions, PathFunction } from "path-to-regexp";
import { MatchResponseProperties, ParamParsers, ResponseFn } from "@curi/types";
export interface ResolveResults {
    resolved: any;
    error: any;
}
export declare type AsyncMatchFn = (matched?: Readonly<MatchResponseProperties>, external?: any) => Promise<any>;
export interface RouteDescriptor {
    name: string;
    path: string;
    path_options?: RegExpOptions;
    params?: ParamParsers;
    children?: Array<RouteDescriptor>;
    response?: ResponseFn;
    resolve?: AsyncMatchFn;
    extra?: {
        [key: string]: any;
    };
}
export interface Route<R = unknown> {
    name: string;
    path: string;
    keys: Array<string | number>;
    extra?: {
        [key: string]: any;
    };
    pathname: PathFunction;
    resolve: R;
}
export interface SyncRoute extends Route<undefined> {
}
export interface AsyncRoute extends Route<AsyncMatchFn> {
}
