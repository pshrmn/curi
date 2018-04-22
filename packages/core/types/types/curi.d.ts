import { History, HickoryLocation, Action } from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";
import { Interaction, Interactions } from "./interaction";
import { RouteDescriptor } from "./route";
import { Response } from "./response";
export interface Navigation<B> {
    action: Action;
    previous: Response<B> | null;
}
export interface Emitted<B> {
    response: Response<B>;
    navigation: Navigation<B>;
    router: CuriRouter<B>;
}
export declare type ResponseHandler<B> = (props?: Emitted<B>) => void;
export interface RespondOptions {
    observe?: boolean;
    initial?: boolean;
}
export declare type RemoveResponseHandler = () => void;
export interface SideEffect<B> {
    fn: ResponseHandler<B>;
    after?: boolean;
}
export interface Cache<B> {
    set: (response: Response<B>) => void;
    get: (location: HickoryLocation) => Response<B>;
}
export interface RouterOptions<B> {
    route?: Array<Interaction>;
    sideEffects?: Array<SideEffect<B>>;
    cache?: Cache<B>;
    pathnameOptions?: PathFunctionOptions;
    emitRedirects?: boolean;
}
export interface CurrentResponse<B> {
    response: Response<B> | null;
    navigation: Navigation<B> | null;
}
export interface CuriRouter<B> {
    replaceRoutes: (routeArray: Array<RouteDescriptor>) => void;
    respond: (fn: ResponseHandler<B>, options?: RespondOptions) => RemoveResponseHandler | void;
    route: Interactions;
    history: History;
    current(): CurrentResponse<B>;
}
