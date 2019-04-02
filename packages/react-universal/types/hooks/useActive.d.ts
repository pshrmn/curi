import { SessionLocation } from "@hickory/root";
import { Params } from "@curi/types";
export declare type LocationCheck = (l: SessionLocation) => boolean;
export interface ActiveHookProps {
    name: string;
    params?: Params;
    partial?: boolean;
    locationCheck?: LocationCheck;
}
export default function useActive(props: ActiveHookProps): any;
