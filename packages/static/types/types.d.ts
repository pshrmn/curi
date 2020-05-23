import { RouteMatcher, Params, Emitted } from "@curi/types";
import { RouterOptions } from "@curi/router";
import { HistoryOptions } from "@hickory/in-memory";
export interface PageDescriptor {
    name: string;
    params?: Params;
}
export interface FallbackDescriptor {
    filename: string;
    pathname: string;
}
export interface StaticOutput {
    render: (emitted: Emitted) => string;
    dir: string;
}
export interface StaticRouter {
    routes: RouteMatcher;
    options?: RouterOptions;
}
export interface StaticConfiguration {
    pages: PageDescriptor[];
    fallback?: FallbackDescriptor;
    router: StaticRouter;
    output: StaticOutput;
    history?: HistoryOptions;
}
export interface Result {
    pathname: string;
    success: boolean;
    error?: Error;
}
export interface PathnamesConfiguration {
    routes: RouteMatcher;
    pages: PageDescriptor[];
}
