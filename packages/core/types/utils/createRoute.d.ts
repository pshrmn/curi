import { HickoryLocation } from '@hickory/root';
import { RegExpOptions } from 'path-to-regexp';
import ResponseCreator from './createResponse';
import { AddonGet } from '../interface';
export declare type Title = string | ((params?: object, data?: any) => string);
export declare type LoadFn = (params?: object, location?: HickoryLocation, modifiers?: LoadModifiers, addons?: {
    [key: string]: AddonGet;
}) => Promise<any>;
export interface RouteDescriptor {
    name: string;
    path: string;
    pathOptions?: RegExpOptions;
    body?: () => any;
    children?: Array<RouteDescriptor>;
    preload?: () => Promise<any>;
    load?: LoadFn;
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
    load: LoadFn;
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
