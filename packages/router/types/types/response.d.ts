import { SessionLocation, PartialLocation } from "@hickory/root";
import { RouteLocation } from "./location";
export declare type RawParams = {
    [key: string]: string;
};
export declare type Params = {
    [key: string]: any;
};
export interface MatchResponseProperties<Q> {
    location: SessionLocation<Q>;
    name: string;
    params: Params;
    partials: Array<string>;
}
export interface SettableResponseProperties {
    status?: number;
    error?: any;
    body?: any;
    data?: any;
    title?: string;
    redirectTo?: RedirectProps;
}
export interface RedirectLocation<Q> extends PartialLocation<Q> {
    name: string;
    params?: Params;
    url: string;
}
export interface Response<Q> extends MatchResponseProperties<Q> {
    status?: number;
    error?: any;
    body?: any;
    data?: any;
    title?: string;
    redirectTo?: RedirectLocation<Q>;
}
export interface RedirectProps extends RouteLocation {
    name: string;
}
