import { Key } from "path-to-regexp";
import { RouteMatcher, RouteDescriptor, Route, ParamParsers } from "@curi/types";
export interface PreparedRoute {
    public: Route;
    matching: {
        children: Array<PreparedRoute>;
        exact: boolean;
        re: RegExp;
        keys: Array<Key>;
        parsers: ParamParsers;
    };
}
export default function prepareRoutes(routes: Array<RouteDescriptor>): RouteMatcher;
