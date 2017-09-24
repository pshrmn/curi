import { History } from '@hickory/root';
import { RouteDescriptor } from './utils/createRoute';
import { AnyResponse } from './utils/createResponse';
import { AddonFactory, AddonGet, SideEffect, Subscriber, UnsubscribeFn, Cache } from './interface';
export interface ConfigOptions {
    addons?: Array<AddonFactory>;
    sideEffects?: Array<SideEffect>;
    cache?: Cache;
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
