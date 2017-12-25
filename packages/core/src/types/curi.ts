import { History, HickoryLocation, Action } from '@hickory/root';
import { PathFunctionOptions } from 'path-to-regexp';

import { Addon, Addons } from './addon';
import { RouteDescriptor } from './route';
import { Response } from './response';

export type ResponseHandler = (
  response: Response,
  action?: Action,
  config?: CuriConfig
) => void;
export interface RespondOptions {
  once?: boolean;
}
export type RemoveResponseHandler = () => void;

export interface SideEffect {
  fn: ResponseHandler;
  after?: boolean;
}

export interface Cache {
  set: (response: Response) => void;
  get: (location: HickoryLocation) => Response;
}

export interface ConfigOptions {
  addons?: Array<Addon>;
  sideEffects?: Array<SideEffect>;
  cache?: Cache;
  pathnameOptions?: PathFunctionOptions;
}

export interface CuriConfig {
  refresh: (routeArray: Array<RouteDescriptor>) => void;
  respond: (
    fn: ResponseHandler,
    options?: RespondOptions
  ) => RemoveResponseHandler;
  addons: Addons;
  history: History;
}
