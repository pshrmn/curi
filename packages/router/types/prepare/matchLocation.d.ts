import { SessionLocation } from "@hickory/root";
import { Match } from "@curi/types";
import { PreparedRoute } from "./prepareRoutes";
export declare function matchLocation(location: SessionLocation, routes: Array<PreparedRoute>): Match | undefined;
