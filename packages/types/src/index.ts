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
  pathOptions?: PathOptions;
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  response?: ResponseFn;
  resolve?: AsyncMatchFn;
  extra?: { [key: string]: any };
}

export interface PathOptions {
  match?: RegExpOptions;
  compile?: PathFunctionOptions;
}

// third argument to createRouter
export interface RouterOptions<O = HistoryOptions> {
  route?: Array<Interaction>;
  sideEffects?: Array<Observer>;
  emitRedirects?: boolean;
  external?: any;
  history?: O;
}

// object returned by createRouter
export interface CuriRouter {
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

// the object emitted to observers
export interface Emitted {
  response: Response;
  navigation: Navigation;
  router: CuriRouter;
}

// a function to be called when there is an asynchronous navigation
export type Cancellable = (cancel?: CancelActiveNavigation) => void;
export type CancelActiveNavigation = () => void;
export type RemoveCancellable = () => void;

// a route's parsed parameters
export type Params = { [key: string]: any };
// a function to convert a parsed param from a string to something else
export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

// a description of a route to navigate to
export interface RouteLocation {
  name?: string;
  params?: Params;
  hash?: string;
  query?: any;
  state?: any;
}

// the intrinsic properties of a response based on matched route
export interface IntrinsicResponse {
  location: SessionLocation;
  name: string;
  params: Params;
  partials: Array<string>;
}

// properties describing a location to redirect to
export interface RedirectLocation extends PartialLocation {
  name: string;
  params?: Params;
  url: string;
}

// full interface of response properties
export interface Response extends IntrinsicResponse {
  status?: number;
  error?: any;
  body?: any;
  data?: any;
  title?: string;
  redirect?: RedirectLocation;
}

// the public prepared route interface
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
  matched?: Readonly<IntrinsicResponse>,
  external?: any
) => Promise<any>;

// the array returned by prepareRoutes
export type PreparedRoutes = Array<PreparedRoute>;
export interface PreparedRoute {
  public: Route;
  sync: boolean;
  children: Array<PreparedRoute>;
  response?: ResponseFn;
  pathMatching: {
    exact: boolean;
    re: RegExp;
    keys: Array<Key>;
  };
  paramParsers?: ParamParsers;
}

// a route's response function is used to return properties to add
// to the intrinsic response properites
export type ResponseFn = (
  props: Readonly<ResponseBuilder>
) => SettableResponseProperties;

// the properties that will be passed to a route's response function
export interface ResponseBuilder {
  resolved: any;
  error: any;
  match: IntrinsicResponse;
  external: any;
}

export interface RedirectProps extends RouteLocation {
  name: string;
}

export interface SettableResponseProperties {
  status?: number;
  error?: any;
  body?: any;
  data?: any;
  title?: string;
  redirect?: RedirectProps;
}

export interface ResolveResults {
  resolved: any;
  error: any;
}

// the interface of an object used to create a route interaction
export interface Interaction {
  name: string;
  register: RegisterInteraction;
  get: GetInteraction;
}
export type Interactions = { [key: string]: GetInteraction };

export type RegisterInteraction = (route: Route, parent?: any) => any;
export type GetInteraction = (name: string, ...rest: Array<any>) => any;
