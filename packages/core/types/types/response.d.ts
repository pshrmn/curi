import { HickoryLocation, ToArgument } from "@hickory/root";
export declare type RawParams = {
    [key: string]: string;
};
export declare type Params = {
    [key: string]: any;
};
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
export interface Response<B> extends GenericResponse {
    body: B;
}
export interface Resolved {
    error: any;
    initial: any;
    every: any;
}
