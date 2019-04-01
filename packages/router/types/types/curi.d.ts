import { HistoryOptions } from "@hickory/root";
import { PathFunctionOptions } from "path-to-regexp";
import { Observer, Interaction } from "@curi/types";
export interface RouterOptions<O = HistoryOptions> {
    route?: Array<Interaction>;
    side_effects?: Array<Observer>;
    pathname_options?: PathFunctionOptions;
    emit_redirects?: boolean;
    external?: any;
    history?: O;
}
