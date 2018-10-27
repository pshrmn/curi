import { Params } from "@curi/router";
export interface ActiveHookProps {
    name: string;
    params?: Params;
    partial?: boolean;
}
export default function useActive(props: ActiveHookProps): any;
