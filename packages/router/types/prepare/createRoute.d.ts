import { RouteDescriptor } from "@curi/types";
import { PreparedRoute } from "./prepareRoutes";
export declare function createRoute(props: RouteDescriptor, usedNames: Set<string>, parentPath?: string): PreparedRoute;
