import {
  PathFunction,
  PathFunctionOptions,
  RegExpOptions,
  Key
} from "path-to-regexp";
import {
  History,
  HistoryOptions,
  SessionLocation,
  PartialLocation,
  Action,
  NavType
} from "@hickory/root";

// a route descriptor comes from the user
export interface RouteDescriptor {
  name: string;
  path: string;
  path_options?: RegExpOptions;
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  response?: ResponseFn;
  resolve?: AsyncMatchFn;
  extra?: { [key: string]: any };
}

// third argument to create_router
export interface RouterOptions<O = HistoryOptions> {
  route?: Array<Interaction>;
  side_effects?: Array<Observer>;
  pathname_options?: PathFunctionOptions;
  emit_redirects?: boolean;
  external?: any;
  history?: O;
}

// object returned by create_router
export interface CuriRouter {
  refresh: (routes?: PreparedRoutes) => void;
  observe: (fn: Observer, options?: ResponseHandlerOptions) => RemoveObserver;
  once: (fn: Observer, options?: ResponseHandlerOptions) => void;
  cancel: (fn: Cancellable) => RemoveCancellable;
  current(): CurrentResponse;
  navigate(options: NavigationDetails): CancelNavigateCallbacks;
  route: Interactions;
  history: History;
  external: any;
}

// options passed to router.navigate
export interface NavigationDetails extends RouteLocation {
  method?: NavType;
  cancelled?: () => void;
  finished?: () => void;
}
// callback function to call when cancelling an async navigation
export type CancelNavigateCallbacks = () => void;

// the current response and navigation
export interface CurrentResponse {
  response: Response | null;
  navigation: Navigation | null;
}
// information about a navigation
export interface Navigation {
  action: Action;
  previous: Response | null;
}

// configuration options for router.observe and router.once
export interface ResponseHandlerOptions {
  initial?: boolean;
}
// an observer function that will be called when there is a new navigation
export type Observer = (props?: Emitted) => void;
// observers registered with router.observe can be removed
export type RemoveObserver = () => void;

// a function to
export type Cancellable = (cancel?: CancelActiveNavigation) => void;
export type CancelActiveNavigation = () => void;
export type RemoveCancellable = () => void;

export interface Emitted {
  response: Response;
  navigation: Navigation;
  router: CuriRouter;
}

// a description of a route to navigate to
export interface RouteLocation {
  name?: string;
  params?: Params;
  hash?: string;
  query?: any;
  state?: any;
}

// response

export type Params = { [key: string]: any };

export interface Match {
  location: SessionLocation;
  name: string;
  params: Params;
  partials: Array<string>;
}

export interface RedirectLocation extends PartialLocation {
  name: string;
  params?: Params;
  url: string;
}

export interface Response extends Match {
  status?: number;
  error?: any;
  body?: any;
  data?: any;
  title?: string;
  redirect_to?: RedirectLocation;
}

// route

export interface Route<R = unknown> {
  name: string;
  path: string;
  keys: Array<string | number>;
  extra?: {
    [key: string]: any;
  };
  pathname: PathFunction;
  resolve: R;
}
export interface SyncRoute extends Route<undefined> {}
export interface AsyncRoute extends Route<AsyncMatchFn> {}

export type AsyncMatchFn = (
  matched?: Readonly<Match>,
  external?: any
) => Promise<any>;

// prepared routes

export interface PreparedRoute {
  public: Route;
  sync: boolean;
  children: Array<PreparedRoute>;
  response?: ResponseFn;
  path_matching: PathMatching;
  param_parsers?: ParamParsers;
}

export interface PathMatching {
  exact: boolean;
  re: RegExp;
  keys: Array<Key>;
}

export type ResponseFn = (
  props: Readonly<ResponseBuilder>
) => SettableResponseProperties;

export type PreparedRoutes = Array<PreparedRoute>;

export interface RedirectProps extends RouteLocation {
  name: string;
}

export interface SettableResponseProperties {
  status?: number;
  error?: any;
  body?: any;
  data?: any;
  title?: string;
  redirect_to?: RedirectProps;
}

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface ResponseBuilder {
  resolved: any;
  error: any;
  match: Match;
  external: any;
}

// should this exist?
export interface ResolveResults {
  resolved: any;
  error: any;
}

// interaction

export type RegisterInteraction = (route: Route, parent?: any) => any;
export type GetInteraction = (name: string, ...rest: Array<any>) => any;

export interface Interaction {
  name: string;
  register: RegisterInteraction;
  get: GetInteraction;
  reset(): void;
}

export type Interactions = { [key: string]: GetInteraction };
