import { SessionLocation } from "@hickory/root";
import { Params } from "@curi/router";
export declare type LocationCheck<Q> = (l: SessionLocation<Q>) => boolean;
export interface ActiveHookProps<Q> {
    name: string;
    params?: Params;
    partial?: boolean;
    locationCheck?: LocationCheck<Q>;
}
export default function useActive<Q>(props: ActiveHookProps<Q>): any;
