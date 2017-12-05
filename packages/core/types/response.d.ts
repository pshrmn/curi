import { HickoryLocation, ToArgument } from '@hickory/root';
import { InternalRoute } from './route';
import { Params, Addons } from './interface';
export interface ResponseProps {
    location: HickoryLocation;
    params: Params;
    partials: Array<string>;
    status: number;
    body: any;
    data: any;
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
    props: ResponseProps;
}
export interface Response {
    key: string;
    location: HickoryLocation;
    status: number;
    data: any;
    title: string;
    body: any;
    name?: string;
    partials?: Array<string>;
    params?: Params;
    error?: any;
    redirectTo?: any;
}
export declare function createResponse(location: HickoryLocation, routes: Array<InternalRoute>): Promise<PendingResponse>;
export declare function finishResponse(pending: PendingResponse, addons: Addons): Response;
