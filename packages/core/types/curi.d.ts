import { History } from "@hickory/root";
import { RouteDescriptor } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
declare function createRouter<B>(history: History, routeArray: Array<RouteDescriptor>, options?: RouterOptions<B>): CuriRouter<B>;
export default createRouter;
