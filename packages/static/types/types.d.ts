import { Params, RouterOptions } from "@curi/router";
export interface PageDescriptor {
    name: string;
    params?: Params;
}
export declare type GetRouterOptions = () => RouterOptions;
