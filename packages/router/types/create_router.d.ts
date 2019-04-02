import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { PreparedRoutes, CuriRouter, RouterOptions } from "@curi/types";
export default function create_router<HOpts = HistoryOptions>(history_constructor: HistoryConstructor<HOpts>, route_array: PreparedRoutes, options?: RouterOptions<HOpts>): CuriRouter;
