import { History } from '@hickory/root';
import { PathFunctionOptions } from 'path-to-regexp';
import { RouteDescriptor } from './route';
import { Addon, Addons, SideEffect, ResponseHandler, RemoveResponseHandler, Cache } from './interface';
export interface ConfigOptions {
    addons?: Array<Addon>;
    sideEffects?: Array<SideEffect>;
    cache?: Cache;
    pathnameOptions?: PathFunctionOptions;
}
export interface ResponseHandlerOptions {
    once?: boolean;
}
export interface CuriConfig {
    refresh: (routeArray: Array<RouteDescriptor>) => void;
    respond: (fn: ResponseHandler, options?: ResponseHandlerOptions) => RemoveResponseHandler;
    addons: Addons;
    history: History;
}
declare function createConfig(history: History, routeArray: Array<RouteDescriptor>, options?: ConfigOptions): CuriConfig;
export default createConfig;
