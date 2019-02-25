import { Interaction, Params } from "@curi/router";
import { SessionLocation } from "@hickory/root";
export declare type LocationCheck = (l: SessionLocation) => boolean;
export interface ActiveCheckOptions {
    params?: Params;
    partial?: boolean;
    locationCheck?: LocationCheck;
}
export default function checkIfActive(): Interaction;
