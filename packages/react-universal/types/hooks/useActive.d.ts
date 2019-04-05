import { SessionLocation } from "@hickory/root";
import { Params } from "@curi/types";
export declare type ValidateComponents = (l: SessionLocation) => boolean;
export interface ActiveHookProps {
    name: string;
    params?: Params;
    partial?: boolean;
    components?: ValidateComponents;
}
export default function useActive(props: ActiveHookProps): any;
