import { Interaction } from "@curi/core";
export interface PrefetchType {
    initial?: boolean;
    every?: boolean;
}
export default function prefetchRoute(): Interaction;
