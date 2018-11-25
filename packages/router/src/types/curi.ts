import { History, Action, NavType } from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";

import { Interaction, Interactions } from "./interaction";
import { UserRoutes } from "./route";
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

export type Observer = (props?: Emitted) => void;

export interface ResponseHandlerOptions {
  initial?: boolean;
}
export type RemoveObserver = () => void;

export type CancelActiveNavigation = () => void;
export type Cancellable = (cancelActive?: CancelActiveNavigation) => void;
export type RemoveCancellable = () => void;

export interface RouterOptions {
  route?: Array<Interaction>;
  sideEffects?: Array<Observer>;
  pathnameOptions?: PathFunctionOptions;
  emitRedirects?: boolean;
  automaticRedirects?: boolean;
  external?: any;
}

export interface CurrentResponse {
  response: Response | null;
  navigation: Navigation | null;
}

export interface NavigationDetails {
  name?: string;
  params?: Params;
  hash?: string;
  query?: any;
  state?: any;
  method?: NavType;
  cancelled?: () => void;
  finished?: () => void;
}

export type CancelNavigateCallbacks = () => void;

export interface CuriRouter {
  refresh: (routeArray?: UserRoutes) => void;
  observe: (fn: Observer, options?: ResponseHandlerOptions) => RemoveObserver;
  once: (fn: Observer, options?: ResponseHandlerOptions) => void;
  cancel: (fn: Cancellable) => RemoveCancellable;
  route: Interactions;
  history: History;
  current(): CurrentResponse;
  navigate(options: NavigationDetails): CancelNavigateCallbacks;
}
