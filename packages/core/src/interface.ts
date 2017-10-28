import { HickoryLocation } from '@hickory/root';
import { Route } from './route';
import { Response } from './response';

export type AddonRegister = (route: Route, parent?: any) => any;
export type AddonGet = (name: string, ...rest: Array<any>) => any;

export interface Addon {
  name: string;
  register: AddonRegister;
  get: AddonGet;
  reset(): void;
}

export type Addons = { [key: string]: AddonGet };

export type Subscriber = (response: Response, action?: string) => void;
export interface SideEffect {
  fn: Subscriber;
  after?: boolean;
}
export type UnsubscribeFn = () => void;

export interface Cache {
  set: (response: Response) => void;
  get: (location: HickoryLocation) => Response;
}

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

export interface LoadRoute {
  params: object;
  location: object;
  name: string;
}
export interface LoadModifiers {
  fail: (err: any) => void;
  redirect: (to: any, status?: number) => void;
  setData: (data: any) => void;
  setStatus: (status: number) => void;
}

export type LoadFn = (
  route?: LoadRoute,
  modifiers?: LoadModifiers,
  addons?: Addons
) => Promise<any>;
export type PreloadFn = () => Promise<any>;
