import { HickoryLocation, Action } from '@hickory/root';
import { Route } from './route';
import { Response } from './response';
export declare type AddonRegister = (route: Route, parent?: any) => any;
export declare type AddonGet = (name: string, ...rest: Array<any>) => any;
export interface Addon {
    name: string;
    register: AddonRegister;
    get: AddonGet;
    reset(): void;
}
export declare type Addons = {
    [key: string]: AddonGet;
};
export declare type ResponseHandler = (response: Response, action?: Action) => void;
export declare type RemoveResponseHandler = () => void;
export interface SideEffect {
    fn: ResponseHandler;
    after?: boolean;
}
export interface Cache {
    set: (response: Response) => void;
    get: (location: HickoryLocation) => Response;
}
export declare type RawParams = {
    [key: string]: string;
};
export declare type Params = {
    [key: string]: any;
};
export interface RouteProps {
    params: object;
    location: object;
    name: string;
}
export interface ResponseSetters {
    error: (err: any) => void;
    redirect: (to: any, status?: number) => void;
    data: (data: any) => void;
    status: (status: number) => void;
    body: (body: any) => void;
    title: (title: string) => void;
}
export interface ResponseBuilder {
    error: any;
    resolved: any;
    route: RouteProps;
    set: ResponseSetters;
    addons: Addons;
}
export declare type EveryMatchFn = (route?: RouteProps) => Promise<any>;
export declare type InitialMatchFn = () => Promise<any>;
export declare type ResponseMatchFn = (props: ResponseBuilder) => void;
