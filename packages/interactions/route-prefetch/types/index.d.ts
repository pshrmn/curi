import { Interaction, MatchResponseProperties } from "@curi/router";
export interface PrefetchCallOptions {
    match?: MatchResponseProperties;
    external?: any;
}
export default function prefetchRoute(): Interaction;
