import { Interaction, IntrinsicResponse } from "@curi/types";
export interface PrefetchCallOptions {
    match?: IntrinsicResponse;
    external?: any;
}
export default function prefetch_route(): Interaction;
