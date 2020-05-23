import { RouteDescriptor, Route } from "@curi/types";
import { PreparedRoute } from "./prepareRoutes";
interface ParentData {
    path: string;
    keys: (string | number)[];
}
export declare let createRoute: (props: RouteDescriptor, map: {
    [key: string]: Route<unknown>;
}, parent?: ParentData) => PreparedRoute;
export {};
