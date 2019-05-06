import {
  PathFunction,
  PathFunctionOptions,
  RegExpOptions
} from "path-to-regexp";
import { History, SessionLocation, Action, NavType } from "@hickory/root";

// object returned by createRouter
export interface CuriRouter {
  observe(fn: Observer, options?: ResponseHandlerOptions): () => void;
  once(fn: Observer, options?: ResponseHandlerOptions): void;
  cancel(fn: Cancellable): () => void;
  current(): CurrentResponse;
  url(details: RouteLocation): string;
  navigate(options: NavigationDetails): () => void;
  route: RouteGetter;
  history: History;
  external: any;
}

export type RouteGetter = (name: string) => Route | undefined;

// options passed to router.navigate
export interface NavigationDetails {
  url: string;
  state?: any;
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

export interface ResponseAndNav {
  response: Response;
  navigation: Navigation;
}

// the object emitted to observers
export interface Emitted extends ResponseAndNav {
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
}

// properties describing a location to redirect to
export interface RedirectLocation extends RouteLocation {
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
  respond?: RespondFn;
  resolve?: Resolver;
  extra?: { [key: string]: any };
}

// the public prepared route interface
export interface Route<R = unknown> {
  meta: {
    name: string;
    path: string;
    keys: Array<string | number>;
    ancestors: Array<string>;
    descendants: Array<string>;
  };
  methods: {
    pathname: PathFunction;
    resolve: R;
    respond?: RespondFn;
  };
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
  route: RouteGetter;
}

// a route's respond function is used to return properties to add
// to the intrinsic response properites
export type RespondFn = (
  props: Readonly<ResponseBuilder>
) => SettableResponseProperties;

// the properties that will be passed to a route's respond function
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
export type Interaction = (route: Readonly<Route>, ...rest: Array<any>) => any;
