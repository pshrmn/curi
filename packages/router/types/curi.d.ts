import { History } from "@hickory/root";
import { UserRoutes } from "./types/route";
import { CuriRouter, RouterOptions } from "./types/curi";
export default function createRouter(history: History, routeArray: UserRoutes, options?: RouterOptions): CuriRouter;
