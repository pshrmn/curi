import { HickoryLocation, ToArgument } from "@hickory/root";
export declare type RawParams = {
    [key: string]: string;
};
export declare type Params = {
    [key: string]: any;
};
export interface ModifiableResponseProperties {
    status?: number;
    error?: any;
    body?: any;
    data?: any;
    title?: string;
    redirectTo?: RedirectProps;
}
export interface GenericResponse {
    location: HickoryLocation;
    key: string;
    status: number;
    title: string;
    name: string;
    params: Params;
    partials: Array<string>;
    body: any;
    data: any;
    error?: any;
    redirectTo?: ToArgument;
}
export declare type Response = GenericResponse;
export interface Resolved {
    error: any;
    initial: any;
    every: any;
}
export interface RedirectProps {
    name: string;
    params?: Params;
    hash?: string;
    query?: any;
    state?: any;
}
