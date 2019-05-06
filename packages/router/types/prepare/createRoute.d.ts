import { RouteDescriptor, Route } from "@curi/types";
import { PreparedRoute } from "./prepareRoutes";
interface ParentData {
    path: string;
    keys: Array<string | number>;
}
export declare function createRoute(props: RouteDescriptor, map: {
    [key: string]: Route;
}, parent?: ParentData): PreparedRoute;
export {};
