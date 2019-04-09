import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { PreparedRoutes, CuriRouter, RouterOptions } from "@curi/types";
export default function create_router<O = HistoryOptions>(history_constructor: HistoryConstructor<O>, routes: PreparedRoutes, options?: RouterOptions<O>): CuriRouter;
