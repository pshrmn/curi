import { HistoryConstructor, HistoryOptions } from "@hickory/root";
import { RouteMatcher, CuriRouter, Observer } from "@curi/types";
export interface RouterOptions<O = HistoryOptions> {
    sideEffects?: Array<Observer>;
    invisibleRedirects?: boolean;
    external?: any;
    history?: O;
}
export default function createRouter<O = HistoryOptions>(historyConstructor: HistoryConstructor<O>, routes: RouteMatcher, options?: RouterOptions<O>): CuriRouter;
