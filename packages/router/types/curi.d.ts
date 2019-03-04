import { History, PendingNavigation } from "@hickory/root";
import { CompiledRouteArray } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
declare type PendingHistory = (fn: (p: PendingNavigation) => void) => History;
export default function createRouter(pendingHistory: PendingHistory, routeArray: CompiledRouteArray, options?: RouterOptions): CuriRouter;
export {};
