import { RouteDescriptor } from "@curi/router";
import { PageDescriptor, GetRouterOptions } from "./types";
export interface PathnamesConfiguration {
    routes: Array<RouteDescriptor>;
    pages: Array<PageDescriptor>;
    routerOptions?: GetRouterOptions;
}
export default function pathnames(config: PathnamesConfiguration): Array<string>;
