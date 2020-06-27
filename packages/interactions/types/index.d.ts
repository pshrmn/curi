import { Route, Response, Params, IntrinsicResponse, ResolveResults } from "@curi/types";
import { SessionLocation } from "@hickory/root";
export declare let pathname: (route: Route<unknown>, params?: Params | undefined) => string;
declare type ValidateComponents = (l: SessionLocation) => boolean;
interface ActiveCheckOptions {
    params?: Params;
    partial?: boolean;
    components?: ValidateComponents;
}
export declare let active: (route: Route<unknown>, response: Response, options?: ActiveCheckOptions) => boolean;
export declare let ancestors: (route: Route<unknown>) => Route<unknown>[];
interface PrefetchCallOptions {
    match?: IntrinsicResponse;
    external?: any;
}
export declare let prefetch: (route: Route<unknown>, options?: PrefetchCallOptions) => Promise<ResolveResults>;
export {};
