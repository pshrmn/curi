import { History, HickoryLocation, Action } from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";

import { Interaction, Interactions } from "./interaction";
import { RouteDescriptor } from "./route";
import { Response, Params } from "./response";

export interface Navigation {
  action: Action;
  previous: Response | null;
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
  effect: ResponseHandler;
  after?: boolean;
}

export interface Cache {
  set: (response: Response) => void;
  get: (location: HickoryLocation) => Response;
}

export interface RouterOptions {
  route?: Array<Interaction>;
  sideEffects?: Array<SideEffect>;
  cache?: Cache;
  pathnameOptions?: PathFunctionOptions;
  emitRedirects?: boolean;
}

export interface CurrentResponse {
  response: Response | null;
  navigation: Navigation | null;
}

export interface CuriRouter {
  replaceRoutes: (routeArray: Array<RouteDescriptor>) => void;
  respond: (
    fn: ResponseHandler,
    options?: RespondOptions
  ) => RemoveResponseHandler | void;
  route: Interactions;
  history: History;
  current(): CurrentResponse;
}
