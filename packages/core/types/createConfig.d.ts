import { History } from '@hickory/root';
import { PathFunctionOptions } from 'path-to-regexp';
import { RouteDescriptor } from './utils/createRoute';
import { AnyResponse } from './utils/createResponse';
import { Addon, AddonGet, SideEffect, Subscriber, UnsubscribeFn, Cache } from './interface';
export interface ConfigOptions {
    addons?: Array<Addon>;
    sideEffects?: Array<SideEffect>;
    cache?: Cache;
    pathnameOptions?: PathFunctionOptions;
}
export interface CuriConfig {
    ready: () => Promise<AnyResponse>;
    refresh: (routeArray: Array<RouteDescriptor>) => void;
    subscribe: (fn: Subscriber) => UnsubscribeFn;
    addons: {
        [key: string]: AddonGet;
    };
    history: History;
}
declare function createConfig(history: History, routeArray: Array<RouteDescriptor>, options?: ConfigOptions): CuriConfig;
export default createConfig;
