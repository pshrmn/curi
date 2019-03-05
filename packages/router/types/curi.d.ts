import { HistoryConstructor } from "@hickory/root";
import { CompiledRouteArray } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
export default function createRouter<O>(historyConstructor: HistoryConstructor, routeArray: CompiledRouteArray, options?: RouterOptions<O>): CuriRouter;
