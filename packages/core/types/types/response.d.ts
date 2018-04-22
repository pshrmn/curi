import { HickoryLocation, ToArgument } from "@hickory/root";
export declare type RawParams = {
    [key: string]: string;
};
export declare type Params = {
    [key: string]: any;
};
export interface BaseResponse {
    location: HickoryLocation;
    key: string;
    status: number;
    title: string;
}
export declare type MissResponse = BaseResponse;
export interface PendingMatchResponse extends BaseResponse {
    name: string;
    params: Params;
    partials: Array<string>;
    body: any;
    data: any;
    error?: any;
    redirectTo?: ToArgument;
}
export interface MatchResponse<B> extends PendingMatchResponse {
    body: B;
}
export declare type PendingResponse = PendingMatchResponse | MissResponse;
export declare type Response<B> = MatchResponse<B> | MissResponse;
export interface Resolved {
    error: any;
    initial: any;
    every: any;
}
