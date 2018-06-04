import { Interaction } from "@curi/router";
export interface PrefetchType {
    initial?: boolean;
    every?: boolean;
}
export default function prefetchRoute(): Interaction;
