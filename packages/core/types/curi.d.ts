import { History } from "@hickory/root";
import { RouteDescriptor } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
declare function createRouter(history: History, routeArray: Array<RouteDescriptor>, options?: RouterOptions): CuriRouter;
export default createRouter;
