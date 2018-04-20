import { RegExpOptions, Key } from "path-to-regexp";
import { LocationDetails } from "@hickory/root";
import { Params, Response, AsyncResults } from "./response";
import { Addons } from "./addon";
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface RouteProps {
    params: object;
    location: object;
    name: string;
}
export interface RedirectProps extends LocationDetails {
    name: string;
    params?: Params;
    status?: number;
}
export interface ResponseSetters {
    error: (err: any) => void;
    redirect: (props: RedirectProps) => void;
    data: (data: any) => void;
    status: (status: number) => void;
    body: (body: any) => void;
    title: (title: string) => void;
}
export interface ResponseBuilder {
    async: AsyncResults;
    route: RouteProps;
    set: ResponseSetters;
    addons: Addons;
}
export declare type EveryMatchFn = (route?: RouteProps) => Promise<any>;
export declare type InitialMatchFn = () => Promise<any>;
export declare type ResponseMatchFn = (props: ResponseBuilder) => void;
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
    pathMatching: InternalMatch;
    paramParsers: ParamParsers;
}
export interface MatchingRoute {
    route: InternalRoute;
    params: Params;
}
export interface BestMatch {
    route: InternalRoute;
    response: Response;
}
