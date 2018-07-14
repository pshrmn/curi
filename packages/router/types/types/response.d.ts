import { HickoryLocation, PartialLocation } from "@hickory/root";
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
export interface Response extends MatchResponseProperties {
    status?: number;
    error?: any;
    body?: any;
    data?: any;
    title?: string;
    redirectTo?: PartialLocation;
}
export interface RedirectProps {
    name: string;
    params?: Params;
    hash?: string;
    query?: any;
    state?: any;
}
