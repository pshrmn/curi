import { History, HickoryLocation, Action } from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";

import { Addon, Addons } from "./addon";
import { RouteDescriptor } from "./route";
import { Response } from "./response";

export interface Navigation {
  action: Action;
  previous: Response;
}

export type ResponseHandler = (
  response: Response,
  navigation?: Navigation,
  router?: CuriRouter
) => void;
export interface RespondOptions {
  once?: boolean;
  initial?: boolean;
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

export interface RouterOptions {
  addons?: Array<Addon>;
  sideEffects?: Array<SideEffect>;
  cache?: Cache;
  pathnameOptions?: PathFunctionOptions;
  emitRedirects?: boolean;
}

export interface CurrentResponse {
  response: Response;
  navigation: Navigation;
}

export interface CuriRouter {
  refresh: (routeArray: Array<RouteDescriptor>) => void;
  respond: (
    fn: ResponseHandler,
    options?: RespondOptions
  ) => RemoveResponseHandler;
  addons: Addons;
  history: History;
  current(): CurrentResponse;
}
