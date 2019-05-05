import { Key } from "path-to-regexp";
import { RouteMatcher, RouteDescriptor, Interaction, Route, ParamParsers } from "@curi/types";
export interface PreparedRoute {
    public: Route;
    children: Array<PreparedRoute>;
    matcher: {
        exact: boolean;
        re: RegExp;
        keys: Array<Key>;
        parsers?: ParamParsers;
    };
}
export interface PrepareRoutesOptions {
    routes: Array<RouteDescriptor>;
    interactions?: {
        [key: string]: Interaction;
    };
}
export default function prepareRoutes(options: PrepareRoutesOptions): RouteMatcher;
