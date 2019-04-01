import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { PreparedRoutes, CuriRouter } from "@curi/types";
import { RouterOptions } from "./types/curi";
export default function create_router<HOpts = HistoryOptions>(history_constructor: HistoryConstructor<HOpts>, route_array: PreparedRoutes, options?: RouterOptions<HOpts>): CuriRouter;
