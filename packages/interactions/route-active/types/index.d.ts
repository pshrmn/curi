import { Interaction, Params } from "@curi/types";
import { SessionLocation } from "@hickory/root";
export declare type LocationCheck = (l: SessionLocation) => boolean;
export interface ActiveCheckOptions {
    params?: Params;
    partial?: boolean;
    location_check?: LocationCheck;
}
export default function check_if_active(): Interaction;
