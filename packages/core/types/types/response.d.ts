import { HickoryLocation, ToArgument } from "@hickory/root";
import { InternalRoute } from "./route";
export declare type RawParams = {
    [key: string]: string;
};
export declare type Params = {
    [key: string]: any;
};
export interface Response {
    location: HickoryLocation;
    key: string;
    params: Params;
    name: string;
    partials: Array<string>;
    status: number;
    body: any;
    data: any;
    title: string;
    error?: any;
    redirectTo?: ToArgument;
}
export interface ResolvedObject {
    initial: any;
    every: any;
}
export interface PendingResponse {
    error?: any;
    resolved?: ResolvedObject;
    route: InternalRoute;
    response: Response;
}
