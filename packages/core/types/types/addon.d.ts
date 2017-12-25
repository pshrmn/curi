import { Route } from './route';
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
