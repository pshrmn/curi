import { History, Action, NavType, HistoryOptions } from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";

import { Interaction, Interactions } from "./interaction";
import { CompiledRouteArray } from "./route";
import { Response } from "./response";
import { RouteLocation } from "./location";

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
export type Cancellable = (cancel?: CancelActiveNavigation) => void;
export type RemoveCancellable = () => void;

export interface RouterOptions<O = HistoryOptions> {
  route?: Array<Interaction>;
  side_effects?: Array<Observer>;
  pathname_options?: PathFunctionOptions;
  emit_redirects?: boolean;
  external?: any;
  history?: O;
}

export interface CurrentResponse {
  response: Response | null;
  navigation: Navigation | null;
}

export interface NavigationDetails extends RouteLocation {
  method?: NavType;
  cancelled?: () => void;
  finished?: () => void;
}

export type CancelNavigateCallbacks = () => void;

export interface CuriRouter {
  refresh: (routes?: CompiledRouteArray) => void;
  observe: (fn: Observer, options?: ResponseHandlerOptions) => RemoveObserver;
  once: (fn: Observer, options?: ResponseHandlerOptions) => void;
  cancel: (fn: Cancellable) => RemoveCancellable;
  current(): CurrentResponse;
  navigate(options: NavigationDetails): CancelNavigateCallbacks;
  route: Interactions;
  history: History;
  external: any;
}
