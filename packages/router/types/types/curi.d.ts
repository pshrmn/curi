import { History, Action, NavType } from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";
import { Interaction, Interactions } from "./interaction";
import { CompiledRouteArray } from "./route";
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
export declare type Observer = (props?: Emitted) => void;
export interface ResponseHandlerOptions {
    initial?: boolean;
}
export declare type RemoveObserver = () => void;
export declare type CancelActiveNavigation = () => void;
export declare type Cancellable = (cancelActive?: CancelActiveNavigation) => void;
export declare type RemoveCancellable = () => void;
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
export declare type CancelNavigateCallbacks = () => void;
export interface CuriRouter {
    refresh: (routeArray?: CompiledRouteArray) => void;
    observe: (fn: Observer, options?: ResponseHandlerOptions) => RemoveObserver;
    once: (fn: Observer, options?: ResponseHandlerOptions) => void;
    cancel: (fn: Cancellable) => RemoveCancellable;
    current(): CurrentResponse;
    navigate(options: NavigationDetails): CancelNavigateCallbacks;
    route: Interactions;
    history: History;
    external: any;
}
