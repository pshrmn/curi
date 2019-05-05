import { RouteDescriptor } from "@curi/types";
import { PreparedRoute } from "./prepareRoutes";
interface ParentData {
    path: string;
    ancestors: Array<string>;
    keys: Array<string | number>;
}
export declare function createRoute(props: RouteDescriptor, usedNames: Set<string>, parent?: ParentData): PreparedRoute;
export {};
