import { Interaction, MatchResponseProperties } from "@curi/router";
export interface PrefetchCallOptions<Q> {
    match?: MatchResponseProperties<Q>;
    external?: any;
}
export default function prefetchRoute<Q>(): Interaction;
