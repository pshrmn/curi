import { RegExpOptions, Key } from 'path-to-regexp';
import { EveryMatchFn, InitialMatchFn, FinishMatchFn } from './interface';
import { ResponseProps } from './response';
export declare type Title = string | ((params?: object, data?: any) => string);
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface RouteProps {
    title: string;
    name?: string;
}
export interface MatchFns {
    initial?: InitialMatchFn;
    every?: EveryMatchFn;
    finish?: FinishMatchFn;
}
export interface RouteDescriptor {
    name: string;
    path: string;
    pathOptions?: RegExpOptions;
    params?: ParamParsers;
    children?: Array<RouteDescriptor>;
    match?: MatchFns;
    title?: Title;
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
    responseProps: (props: ResponseProps) => RouteProps;
}
declare const createRoute: (options: RouteDescriptor) => InternalRoute;
export default createRoute;
