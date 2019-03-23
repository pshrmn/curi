import { RegExpOptions, Key, PathFunction } from "path-to-regexp";
import { MatchResponseProperties, SettableResponseProperties } from "./response";
export interface ResolveResults {
    resolved: any;
    error: any;
}
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface ResponseBuilder {
    resolved: any;
    error: any;
    match: MatchResponseProperties;
    external: any;
}
export declare type ResponseFn = (props: Readonly<ResponseBuilder>) => SettableResponseProperties;
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
export interface CompiledRoute {
    public: Route;
    sync: boolean;
    children: Array<CompiledRoute>;
    response?: ResponseFn;
    path_matching: PathMatching;
    param_parsers?: ParamParsers;
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
export interface PathMatching {
    exact: boolean;
    re: RegExp;
    keys: Array<Key>;
}
export declare type CompiledRouteArray = Array<CompiledRoute>;
