import { Interaction, Params } from "@curi/types";
import { SessionLocation } from "@hickory/root";
export declare type ValidateComponents = (l: SessionLocation) => boolean;
export interface ActiveCheckOptions {
    params?: Params;
    partial?: boolean;
    components?: ValidateComponents;
}
export default function active(): Interaction;
