import { History, Action, NavType } from "@hickory/root";
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
export declare type Observer = (props?: Emitted) => void;
export interface RespondOptions {
    observe?: boolean;
    initial?: boolean;
}
export declare type RemoveObserver = () => void;
export interface SideEffect {
    effect: Observer;
    after?: boolean;
}
export interface RouterOptions {
    route?: Array<Interaction>;
    sideEffects?: Array<SideEffect>;
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
