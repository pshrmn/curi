import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { CompiledRouteArray } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
export default function createRouter<HOpts = HistoryOptions>(historyConstructor: HistoryConstructor<HOpts>, routeArray: CompiledRouteArray, options?: RouterOptions<HOpts>): CuriRouter;
