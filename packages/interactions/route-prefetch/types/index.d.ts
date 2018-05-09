import { Interaction } from "@curi/core";
export interface PrefetchType {
    initial?: boolean;
    every?: boolean;
}
declare function prefetchRoute(): Interaction;
export default prefetchRoute;
