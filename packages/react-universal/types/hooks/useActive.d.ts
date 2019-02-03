import { Params, Response } from "@curi/router";
export interface ActiveHookProps {
    name: string;
    params?: Params;
    partial?: boolean;
}
export declare type ActiveResponse = (resp: Response) => boolean;
export default function useActive(props: ActiveHookProps, respCheck?: ActiveResponse): any;
