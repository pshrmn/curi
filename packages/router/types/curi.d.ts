import { History } from "@hickory/root";
import { RouteDescriptor } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
export default function createRouter(history: History, routeArray: Array<RouteDescriptor>, options?: RouterOptions): CuriRouter;
