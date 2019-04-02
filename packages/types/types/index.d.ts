import { PathFunction, PathFunctionOptions, RegExpOptions, Key } from "path-to-regexp";
import { History, HistoryOptions, SessionLocation, PartialLocation, Action, NavType } from "@hickory/root";
export interface RouteDescriptor {
    name: string;
    path: string;
    path_options?: RegExpOptions;
    params?: ParamParsers;
    children?: Array<RouteDescriptor>;
    response?: ResponseFn;
    resolve?: AsyncMatchFn;
    extra?: {
        [key: string]: any;
    };
}
export interface RouterOptions<O = HistoryOptions> {
    route?: Array<Interaction>;
    side_effects?: Array<Observer>;
    pathname_options?: PathFunctionOptions;
    emit_redirects?: boolean;
    external?: any;
    history?: O;
}
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
export interface NavigationDetails extends RouteLocation {
    method?: NavType;
    cancelled?: () => void;
    finished?: () => void;
}
export declare type CancelNavigateCallbacks = () => void;
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
export declare type RemoveObserver = () => void;
export interface Emitted {
    response: Response;
    navigation: Navigation;
    router: CuriRouter;
}
export declare type Cancellable = (cancel?: CancelActiveNavigation) => void;
export declare type CancelActiveNavigation = () => void;
export declare type RemoveCancellable = () => void;
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
export interface Response extends IntrinsicResponse {
    status?: number;
    error?: any;
    body?: any;
    data?: any;
    title?: string;
    redirect_to?: RedirectLocation;
}
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
export interface SyncRoute extends Route<undefined> {
}
export interface AsyncRoute extends Route<AsyncMatchFn> {
}
export declare type AsyncMatchFn = (matched?: Readonly<IntrinsicResponse>, external?: any) => Promise<any>;
export declare type PreparedRoutes = Array<PreparedRoute>;
export interface PreparedRoute {
    public: Route;
    sync: boolean;
    children: Array<PreparedRoute>;
    response?: ResponseFn;
    path_matching: {
        exact: boolean;
        re: RegExp;
        keys: Array<Key>;
    };
    param_parsers?: ParamParsers;
}
export declare type ResponseFn = (props: Readonly<ResponseBuilder>) => SettableResponseProperties;
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
    redirect_to?: RedirectProps;
}
export interface ResolveResults {
    resolved: any;
    error: any;
}
export interface Interaction {
    name: string;
    register: RegisterInteraction;
    get: GetInteraction;
    reset(): void;
}
export declare type Interactions = {
    [key: string]: GetInteraction;
};
export declare type RegisterInteraction = (route: Route, parent?: any) => any;
export declare type GetInteraction = (name: string, ...rest: Array<any>) => any;
