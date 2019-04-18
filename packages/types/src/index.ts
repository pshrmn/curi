import {
  PathFunction,
  PathFunctionOptions,
  RegExpOptions
} from "path-to-regexp";
import {
  History,
  SessionLocation,
  PartialLocation,
  Action,
  NavType
} from "@hickory/root";

// object returned by createRouter
export interface CuriRouter {
  observe(fn: Observer, options?: ResponseHandlerOptions): () => void;
  once(fn: Observer, options?: ResponseHandlerOptions): void;
  cancel(fn: Cancellable): () => void;
  current(): CurrentResponse;
  navigate(options: NavigationDetails): () => void;
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

// the object emitted to observers
export interface Emitted {
  response: Response;
  navigation: Navigation;
  router: CuriRouter;
}

// a function to be called when there is an asynchronous navigation
export type Cancellable = (cancel?: () => void) => void;

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

export interface ExternalRedirect {
  externalURL: string;
}

// full interface of response properties
export interface Response extends IntrinsicResponse {
  meta?: any;
  body?: any;
  data?: any;
  redirect?: RedirectLocation | ExternalRedirect;
}

// a route descriptor comes from the user
export interface RouteDescriptor {
  name: string;
  path: string;
  pathOptions?: {
    match?: RegExpOptions;
    compile?: PathFunctionOptions;
  };
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  response?: ResponseFn;
  resolve?: Resolver;
  extra?: { [key: string]: any };
}

// the public prepared route interface
export interface Route<R = unknown> {
  name: string;
  path: string;
  keys: Array<string | number>;
  pathname: PathFunction;
  resolve: R;
  response?: ResponseFn;
  extra?: {
    [key: string]: any;
  };
}
export interface SyncRoute extends Route<undefined> {}
export interface AsyncRoute extends Route<Resolver> {}

export type Resolver = (
  matched?: Readonly<IntrinsicResponse>,
  external?: any
) => Promise<any>;

// the array returned by prepareRoutes
export interface Match {
  route: Route;
  match: IntrinsicResponse;
}

export interface RouteMatcher {
  match(l: SessionLocation): Match | undefined;
  interactions: Interactions;
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
  meta?: any;
  body?: any;
  data?: any;
  redirect?: RedirectProps | ExternalRedirect;
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
