import { History } from '@hickory/root';
import { PathFunctionOptions } from 'path-to-regexp';
import { RouteDescriptor } from './route';
import { Response } from './response';
import { Addon, Addons, SideEffect, Subscriber, UnsubscribeFn, Cache } from './interface';
export interface ConfigOptions {
    addons?: Array<Addon>;
    sideEffects?: Array<SideEffect>;
    cache?: Cache;
    pathnameOptions?: PathFunctionOptions;
}
export interface CuriConfig {
    ready: () => Promise<Response>;
    refresh: (routeArray: Array<RouteDescriptor>) => void;
    subscribe: (fn: Subscriber) => UnsubscribeFn;
    addons: Addons;
    history: History;
}
declare function createConfig(history: History, routeArray: Array<RouteDescriptor>, options?: ConfigOptions): CuriConfig;
export default createConfig;
