import { HickoryLocation } from '@hickory/root';
import { Route } from './utils/createRoute';
import { AnyResponse } from './utils/createResponse';
export declare type AddonRegister = (route: Route, parent?: any) => any;
export declare type AddonGet = (name: string, ...rest: Array<any>) => any;
export interface Addon {
    name: string;
    register: AddonRegister;
    get: AddonGet;
}
export declare type AddonFactory = (...args: Array<any>) => Addon;
export declare type Subscriber = (response: AnyResponse, action?: string) => void;
export interface SideEffect {
    fn: Subscriber;
    after?: boolean;
}
export declare type UnsubscribeFn = () => void;
export interface Cache {
    set: (response: AnyResponse) => void;
    get: (location: HickoryLocation) => AnyResponse;
}
export declare type Params = {
    [key: string]: string;
};
