import { Key } from "path-to-regexp";
import { RouteMatcher, RouteDescriptor, Interaction, Route, ParamParsers } from "@curi/types";
export interface PreparedRoute {
    public: Route;
    children: Array<PreparedRoute>;
    pathMatching: {
        exact: boolean;
        re: RegExp;
        keys: Array<Key>;
        paramParsers?: ParamParsers;
    };
}
export interface PrepareRoutesOptions {
    routes: Array<RouteDescriptor>;
    interactions?: Array<Interaction>;
}
export default function prepareRoutes(options: PrepareRoutesOptions): RouteMatcher;
