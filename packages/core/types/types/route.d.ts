import { RegExpOptions, Key } from "path-to-regexp";
import { LocationDetails } from "@hickory/root";
import { Params, Resolved } from "./response";
import { Interactions } from "./interaction";
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface MatchedRouteProps {
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
export interface ResponseBuilder extends MatchedRouteProps {
    resolved: Resolved | null;
    set: ResponseSetters;
    route: Interactions;
}
export declare type EveryMatchFn = (matched?: MatchedRouteProps) => Promise<any>;
export declare type InitialMatchFn = () => Promise<any>;
export declare type ResponseFn = (props: ResponseBuilder) => void;
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
