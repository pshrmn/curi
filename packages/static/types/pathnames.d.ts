import { RouteDescriptor, RouterOptions } from "@curi/router";
import { PageDescriptor } from "./types";
export interface PathnamesConfiguration {
    routes: Array<RouteDescriptor>;
    pages: Array<PageDescriptor>;
    routerOptions?: RouterOptions;
}
export default function pages(config: PathnamesConfiguration): Array<string>;
