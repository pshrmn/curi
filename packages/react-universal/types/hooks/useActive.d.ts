import { HickoryLocation } from "@hickory/root";
import { Params } from "@curi/router";
export declare type LocationCheck = (l: HickoryLocation) => boolean;
export interface ActiveHookProps {
    name: string;
    params?: Params;
    partial?: boolean;
    locationCheck?: LocationCheck;
}
export default function useActive(props: ActiveHookProps): any;
