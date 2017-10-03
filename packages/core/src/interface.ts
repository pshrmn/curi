import { HickoryLocation } from '@hickory/root';
import { Route } from './utils/createRoute';
import { AnyResponse } from './utils/createResponse';

export type AddonRegister = (route: Route, parent?: any) => any;
export type AddonGet = (name: string, ...rest: Array<any>) => any;

export interface Addon {
  name: string;
  register: AddonRegister;
  get: AddonGet;
}

export type AddonFactory = (...args: Array<any>) => Addon;

export type Subscriber = (response: AnyResponse, action?: string) => void;
export interface SideEffect {
  fn: Subscriber;
  after?: boolean;
}
export type UnsubscribeFn = () => void;

export interface Cache {
  set: (response: AnyResponse) => void;
  get: (location: HickoryLocation) => AnyResponse;
}