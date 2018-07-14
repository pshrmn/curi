import { RegExpOptions, Key } from "path-to-regexp";
import { MatchResponseProperties, SettableResponseProperties } from "./response";
export interface Resolved {
    [key: string]: any;
}
export interface ResolveResults {
    resolved: Resolved | null;
    error: any;
}
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface ResponseBuilder {
    resolved: Resolved | null;
    error: any;
    match: MatchResponseProperties;
}
export declare type ResponseFn = (props: ResponseBuilder) => SettableResponseProperties;
export declare type AsyncMatchFn = (matched?: MatchResponseProperties) => Promise<any>;
export interface AsyncGroup {
    [key: string]: AsyncMatchFn;
}
export interface RouteDescriptor {
    name: string;
    path: string;
    pathOptions?: RegExpOptions;
    params?: ParamParsers;
    children?: Array<RouteDescriptor>;
    response?: ResponseFn;
    match?: AsyncGroup;
    extra?: {
        [key: string]: any;
    };
}
export interface Route {
    name: string;
    path: string;
    keys: Array<string | number>;
    match: AsyncGroup;
    extra?: {
        [key: string]: any;
    };
}
export interface PathMatching {
    mustBeExact: boolean;
    re: RegExp;
    keys: Array<Key>;
}
export interface InternalRoute {
    public: Route;
    sync: boolean;
    children: Array<InternalRoute>;
    response?: ResponseFn;
    pathMatching: PathMatching;
    paramParsers?: ParamParsers;
}
