import { HickoryLocation, ToArgument } from "@hickory/root";

import { InternalRoute } from "./route";

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

// the base properties of all responses
export interface BaseResponse {
  location: HickoryLocation;
  key: string;
  status: number;
  title: string;
}

// when no route matches, a miss only contains the base properties
export type MissResponse = BaseResponse;

// when a route matches, the response is extended
export interface PendingMatchResponse extends BaseResponse {
  name: string;
  params: Params;
  partials: Array<string>;
  body: any;
  data: any;
  error?: any;
  redirectTo?: ToArgument;
}

// the final response's body should match the intended shape
export interface MatchResponse<B> extends PendingMatchResponse {
  body: B;
}

export type PendingResponse = PendingMatchResponse | MissResponse;
export type Response<B> = MatchResponse<B> | MissResponse;

export interface Resolved {
  error: any;
  initial: any;
  every: any;
}
