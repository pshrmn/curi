import { Interaction, MatchResponseProperties } from "@curi/types";
export interface PrefetchCallOptions {
    match?: MatchResponseProperties;
    external?: any;
}
export default function prefetch_route(): Interaction;
