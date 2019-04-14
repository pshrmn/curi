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
export default function prepareRoutes(routes: Array<RouteDescriptor>, interactionTypes?: Array<Interaction>): RouteMatcher;
