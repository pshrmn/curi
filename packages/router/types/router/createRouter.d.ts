import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { RouteMatcher, CuriRouter, SideEffect } from "@curi/types";
export interface RouterOptions<O = HistoryOptions> {
    sideEffects?: Array<SideEffect>;
    invisibleRedirects?: boolean;
    external?: any;
    history?: O;
}
export default function createRouter<O = HistoryOptions>(historyConstructor: HistoryConstructor<O>, routes: RouteMatcher, options?: RouterOptions<O>): CuriRouter;
