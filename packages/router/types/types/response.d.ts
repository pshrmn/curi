import { HickoryLocation, PartialLocation } from "@hickory/root";
import { RouteLocation } from "./location";
export declare type RawParams = {
    [key: string]: string;
};
export declare type Params = {
    [key: string]: any;
};
export interface MatchResponseProperties {
    location: HickoryLocation;
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
export interface RedirectLocation extends PartialLocation {
    name: string;
    params?: Params;
    url: string;
}
export interface Response extends MatchResponseProperties {
    status?: number;
    error?: any;
    body?: any;
    data?: any;
    title?: string;
    redirectTo?: RedirectLocation;
}
export interface RedirectProps extends RouteLocation {
    name: string;
}
