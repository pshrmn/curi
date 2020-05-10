import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { RouteMatcher, CuriRouter, Observer } from "@curi/types";
export interface RouterOptions<O = HistoryOptions> {
    sideEffects?: Observer[];
    invisibleRedirects?: boolean;
    external?: any;
    history?: O;
}
declare let createRouter: <O = import("@hickory/root").LocationUtilOptions>(historyConstructor: HistoryConstructor<O>, routes: RouteMatcher, options?: RouterOptions<O>) => CuriRouter;
export default createRouter;
