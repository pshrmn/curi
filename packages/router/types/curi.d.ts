import { History } from "@hickory/root";
import { CompiledRouteArray } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
export default function createRouter<Q>(history: History<Q>, routeArray: CompiledRouteArray, options?: RouterOptions): CuriRouter;
