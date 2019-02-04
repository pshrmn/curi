import { Interaction, Params } from "@curi/router";
import { HickoryLocation } from "@hickory/root";
export declare type LocationCheck = (l: HickoryLocation) => boolean;
export interface ActiveCheckOptions {
    params?: Params;
    partial?: boolean;
    locationCheck?: LocationCheck;
}
export default function checkIfActive(): Interaction;
