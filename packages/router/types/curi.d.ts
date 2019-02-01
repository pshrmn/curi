import { History } from "@hickory/root";
import { CompiledRouteArray } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
export default function createRouter(history: History, routeArray: CompiledRouteArray, options?: RouterOptions): CuriRouter;
