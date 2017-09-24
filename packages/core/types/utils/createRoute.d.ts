import { HickoryLocation } from '@hickory/root';
import { RegExpOptions } from 'path-to-regexp';
import ResponseCreator from './createResponse';
export declare type Title = string | ((params?: object, data?: any) => string);
export interface RouteDescriptor {
    name: string;
    path: string;
    pathOptions?: RegExpOptions;
    body?: () => any;
    children?: Array<RouteDescriptor>;
    preload?: () => Promise<any>;
    load?: (params?: object, location?: HickoryLocation, modifiers?: LoadModifiers) => Promise<any>;
    title?: Title;
    extra?: {
        [key: string]: any;
    };
}
export interface RouteMidCreation extends RouteDescriptor {
    children: Array<Route>;
}
export interface Route {
    name: string;
    path: string;
    body: () => any;
    getBody: () => any;
    children: Array<Route>;
    preload: () => Promise<any>;
    load: (params?: object, location?: HickoryLocation, modifiers?: LoadModifiers) => Promise<any>;
    keys: Array<string | number>;
    match: (pathname: string, rc: ResponseCreator, parentPath?: string) => boolean;
    title: Title;
    extra: {
        [key: string]: any;
    };
}
export interface LoadModifiers {
    fail: (err: any) => void;
    redirect: (to: any, status?: number) => void;
    setData: (data: any) => void;
    setStatus: (status: number) => void;
}
declare const createRoute: (options: RouteMidCreation) => Route;
export default createRoute;
