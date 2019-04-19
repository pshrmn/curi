import { PathFunction, PathFunctionOptions, RegExpOptions } from "path-to-regexp";
import { History, SessionLocation, PartialLocation, Action, NavType } from "@hickory/root";
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
export interface NavigationDetails extends RouteLocation {
    method?: NavType;
    cancelled?: () => void;
    finished?: () => void;
}
export interface CurrentResponse {
    response: Response | null;
    navigation: Navigation | null;
}
export interface Navigation {
    action: Action;
    previous: Response | null;
}
export interface ResponseHandlerOptions {
    initial?: boolean;
}
export declare type Observer = (props?: Emitted) => void;
export interface ResponseAndNav {
    response: Response;
    navigation: Navigation;
}
export interface Emitted extends ResponseAndNav {
    router: CuriRouter;
}
export declare type Cancellable = (cancel?: () => void) => void;
export declare type Params = {
    [key: string]: any;
};
export declare type ParamParser = (input: string) => any;
export interface ParamParsers {
    [key: string]: ParamParser;
}
export interface RouteLocation {
    name?: string;
    params?: Params;
    hash?: string;
    query?: any;
    state?: any;
}
export interface IntrinsicResponse {
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
export interface ExternalRedirect {
    externalURL: string;
}
export interface Response extends IntrinsicResponse {
    meta?: any;
    body?: any;
    data?: any;
    redirect?: RedirectLocation | ExternalRedirect;
}
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
    extra?: {
        [key: string]: any;
    };
}
export interface Route<R = unknown> {
    name: string;
    path: string;
    keys: Array<string | number>;
    pathname: PathFunction;
    resolve: R;
    respond?: RespondFn;
    extra?: {
        [key: string]: any;
    };
}
export interface SyncRoute extends Route<undefined> {
}
export interface AsyncRoute extends Route<Resolver> {
}
export declare type Resolver = (matched?: Readonly<IntrinsicResponse>, external?: any) => Promise<any>;
export interface Match {
    route: Route;
    match: IntrinsicResponse;
}
export interface RouteMatcher {
    match(l: SessionLocation): Match | undefined;
    interactions: Interactions;
}
export declare type RespondFn = (props: Readonly<ResponseBuilder>) => SettableResponseProperties;
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
export interface Interaction {
    name: string;
    register: RegisterInteraction;
    get: GetInteraction;
}
export declare type Interactions = {
    [key: string]: GetInteraction;
};
export declare type RegisterInteraction = (route: Route, parent?: any) => any;
export declare type GetInteraction = (name: string, ...rest: Array<any>) => any;
