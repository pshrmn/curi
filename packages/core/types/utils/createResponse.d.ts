import { HickoryLocation } from '@hickory/root';
import { Route } from './createRoute';
export interface BaseResponse {
    key: string;
    location: HickoryLocation;
    status: number;
    data: any;
    title: string;
}
export interface Response extends BaseResponse {
    body: any;
    name: string;
    partials: Array<string>;
    params: Params;
    error: any;
}
export interface RedirectResponse extends BaseResponse {
    redirectTo: any;
}
export declare type AnyResponse = Response | RedirectResponse;
export declare type Params = {
    [key: string]: string;
};
export interface Match {
    route: Route;
    params: Params;
}
declare class ResponseCreator {
    key: string;
    location: HickoryLocation;
    status: number;
    matches: Array<Match>;
    route: Route;
    partials: Array<string>;
    params: Params;
    body: any;
    data: any;
    redirectTo: any;
    error: any;
    constructor(key: string, location: HickoryLocation);
    redirect(to: any, code?: number): void;
    fail(err: any): void;
    setStatus(code: number): void;
    push(route: Route, params: Params): void;
    pop(): void;
    setData(data: any): void;
    freeze(): void;
    generateTitle(): string;
    asObject(): AnyResponse;
}
export default ResponseCreator;
