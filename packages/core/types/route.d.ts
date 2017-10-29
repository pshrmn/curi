import { RegExpOptions, Key } from 'path-to-regexp';
import { LoadFn, PreloadFn } from './interface';
import { ResponseProps } from './response';
export declare type Title = string | ((params?: object, data?: any) => string);
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface RouteProps {
    body: any;
    title: string;
    name?: string;
}
export interface RouteDescriptor {
    name: string;
    path: string;
    pathOptions?: RegExpOptions;
    params?: ParamParsers;
    body?: () => any;
    children?: Array<RouteDescriptor>;
    preload?: PreloadFn;
    load?: LoadFn;
    title?: Title;
    extra?: {
        [key: string]: any;
    };
}
export interface Route {
    name: string;
    path: string;
    body: () => any;
    keys: Array<string | number>;
    preload: PreloadFn;
    load: LoadFn;
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
