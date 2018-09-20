import { RouteDescriptor, Params, Emitted } from "@curi/router";
import { GetRouterOptions } from "./types";
export interface PageDescriptor {
    name: string;
    params?: Params;
}
export interface GenerateConfiguration {
    routes: Array<RouteDescriptor>;
    pages: Array<PageDescriptor>;
    render: (emitted: Emitted) => string;
    insert: (markup: string, emitted: Emitted) => string;
    outputDir: string;
    outputRedirects?: boolean;
    routerOptions?: GetRouterOptions;
}
export interface Result {
    pathname: string;
    success: boolean;
    error?: Error;
}
export default function generate(config: GenerateConfiguration): Promise<Array<Result>>;
