import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { CompiledRouteArray } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
export default function create_router<HOpts = HistoryOptions>(history_constructor: HistoryConstructor<HOpts>, route_array: CompiledRouteArray, options?: RouterOptions<HOpts>): CuriRouter;
