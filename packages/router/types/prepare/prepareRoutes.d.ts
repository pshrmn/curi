import { Key } from "path-to-regexp";
import { RouteMatcher, RouteDescriptor, Route, ParamParsers } from "@curi/types";
export interface PreparedRoute {
    public: Route;
    matching: {
        children: PreparedRoute[];
        exact: boolean;
        re: RegExp;
        keys: Key[];
        parsers: ParamParsers;
    };
}
declare let prepareRoutes: (routes: RouteDescriptor[]) => RouteMatcher;
export default prepareRoutes;
