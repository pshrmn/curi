import { SessionLocation } from "@hickory/root";
import { Match } from "@curi/types";
import { PreparedRoute } from "./prepareRoutes";
export declare let matchLocation: (location: SessionLocation, routes: PreparedRoute[]) => Match | undefined;
