import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { RouteMatcher, CuriRouter, RouterOptions } from "@curi/types";
export default function createRouter<O = HistoryOptions>(historyConstructor: HistoryConstructor<O>, routes: RouteMatcher, options?: RouterOptions<O>): CuriRouter;
