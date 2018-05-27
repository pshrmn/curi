import { History, HickoryLocation, Action, NavType } from "@hickory/root";
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

export type Observer = (props?: Emitted) => void;

export interface RespondOptions {
  observe?: boolean;
  initial?: boolean;
}
export type RemoveObserver = () => void;

export interface RouterOptions {
  route?: Array<Interaction>;
  sideEffects?: Array<Observer>;
  pathnameOptions?: PathFunctionOptions;
  emitRedirects?: boolean;
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

export interface CuriRouter {
  replaceRoutes: (routeArray: Array<RouteDescriptor>) => void;
  respond: (fn: Observer, options?: RespondOptions) => RemoveObserver | void;
  route: Interactions;
  history: History;
  current(): CurrentResponse;
  navigate(options: NavigationDetails): void;
}
