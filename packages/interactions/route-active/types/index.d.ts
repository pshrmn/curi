import { Interaction, Params } from "@curi/router";
import { SessionLocation } from "@hickory/root";
export declare type LocationCheck<Q> = (l: SessionLocation<Q>) => boolean;
export interface ActiveCheckOptions<Q> {
    params?: Params;
    partial?: boolean;
    locationCheck?: LocationCheck<Q>;
}
export default function checkIfActive<Q>(): Interaction;
