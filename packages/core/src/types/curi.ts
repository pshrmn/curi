import {
  History,
  HickoryLocation,
  PartialLocation,
  Action
} from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";

import { Addon, Addons } from "./addon";
import { RouteDescriptor } from "./route";
import { Response, Params } from "./response";

export interface Navigation {
  action: Action;
  previous: Response;
}

export interface Emitted {
  response: Response;
  navigation: Navigation;
  router: CuriRouter;
}

export type ResponseHandler = (props?: Emitted) => void;

export interface RespondOptions {
  observe?: boolean;
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

export interface LocationProps {
  name: string;
  params?: Params;
  state?: any;
  query?: any;
  hash?: string;
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
  createLocation(options: LocationProps): PartialLocation;
}
