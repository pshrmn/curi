import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { PreparedRoutes, CuriRouter, RouterOptions } from "@curi/types";
export default function createRouter<O = HistoryOptions>(historyConstructor: HistoryConstructor<O>, routes: PreparedRoutes, options?: RouterOptions<O>): CuriRouter;
