import { Interaction, Match } from "@curi/types";
export interface PrefetchCallOptions {
    match?: Match;
    external?: any;
}
export default function prefetch_route(): Interaction;
