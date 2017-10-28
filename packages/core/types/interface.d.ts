import { HickoryLocation } from '@hickory/root';
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
export declare type Subscriber = (response: Response, action?: string) => void;
export interface SideEffect {
    fn: Subscriber;
    after?: boolean;
}
export declare type UnsubscribeFn = () => void;
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
