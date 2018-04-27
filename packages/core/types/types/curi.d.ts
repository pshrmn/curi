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
export declare type ResponseHandler = (props?: Emitted) => void;
export interface RespondOptions {
    observe?: boolean;
    initial?: boolean;
}
export declare type RemoveResponseHandler = () => void;
export interface SideEffect {
    effect: ResponseHandler;
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
}
export interface CuriRouter {
    replaceRoutes: (routeArray: Array<RouteDescriptor>) => void;
    respond: (fn: ResponseHandler, options?: RespondOptions) => RemoveResponseHandler | void;
    route: Interactions;
    history: History;
    current(): CurrentResponse;
    navigate(options: NavigationDetails): void;
}
