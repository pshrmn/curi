import { RegExpOptions, Key } from 'path-to-regexp';
import { EveryMatchFn, InitialMatchFn, ResponseMatchFn } from './interface';
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface MatchFns {
    initial?: InitialMatchFn;
    every?: EveryMatchFn;
    response?: ResponseMatchFn;
}
export interface RouteDescriptor {
    name: string;
    path: string;
    pathOptions?: RegExpOptions;
    params?: ParamParsers;
    children?: Array<RouteDescriptor>;
    match?: MatchFns;
    extra?: {
        [key: string]: any;
    };
}
export interface Route {
    name: string;
    path: string;
    keys: Array<string | number>;
    match: MatchFns;
    extra: {
        [key: string]: any;
    };
}
export interface InternalMatch {
    mustBeExact: boolean;
    re: RegExp;
    keys: Array<Key>;
}
export interface InternalRoute {
    public: Route;
    children: Array<InternalRoute>;
    match: InternalMatch;
    paramParsers: ParamParsers;
}
declare const createRoute: (options: RouteDescriptor) => InternalRoute;
export default createRoute;
