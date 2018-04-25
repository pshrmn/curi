import { RegExpOptions, Key } from "path-to-regexp";
import { Resolved, MatchResponseProperties, SettableResponseProperties } from "./response";
import { Interactions } from "./interaction";
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface ResponseBuilder {
    resolved: Resolved | null;
    route: Interactions;
    match: MatchResponseProperties;
}
export declare type ResponseFn = (props: ResponseBuilder) => SettableResponseProperties;
export declare type EveryMatchFn = (matched?: MatchResponseProperties) => Promise<any>;
export declare type InitialMatchFn = (matched?: MatchResponseProperties) => Promise<any>;
export interface OnFns {
    initial?: InitialMatchFn;
    every?: EveryMatchFn;
}
export interface RouteDescriptor {
    name: string;
    path: string;
    pathOptions?: RegExpOptions;
    params?: ParamParsers;
    children?: Array<RouteDescriptor>;
    response?: ResponseFn;
    on?: OnFns;
    extra?: {
        [key: string]: any;
    };
}
export interface Route {
    name: string;
    path: string;
    keys: Array<string | number>;
    on: OnFns;
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
    children: Array<InternalRoute>;
    response?: ResponseFn;
    pathMatching: PathMatching;
    paramParsers?: ParamParsers;
}
