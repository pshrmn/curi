import { RouteDescriptor, Params, Emitted } from "@curi/router";
import { GetRouterOptions } from "./types";
export interface PageDescriptor {
    name: string;
    params?: Params;
}
export interface StaticConfiguration {
    routes: Array<RouteDescriptor>;
    pages: Array<PageDescriptor>;
    render: (emitted: Emitted) => string;
    insert: (markup: string, emitted: Emitted) => string;
    outputDir: string;
    outputRedirects?: boolean;
    getRouterOptions?: GetRouterOptions;
}
export interface Result {
    pathname: string;
    success: boolean;
    error?: Error;
}
export default function staticFiles(config: StaticConfiguration): Promise<Array<Result>>;
