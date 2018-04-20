import { HickoryLocation, ToArgument } from "@hickory/root";

import { InternalRoute } from "./route";

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

export interface Response {
  location: HickoryLocation;
  key: string;
  params: Params;
  name: string;
  partials: Array<string>;
  status: number;
  body: any;
  data: any;
  title: string;
  error?: any;
  redirectTo?: ToArgument;
}

export interface AsyncResults {
  error: any;
  initial: any;
  every: any;
}

export interface PendingResponse {
  async?: AsyncResults;
  route: InternalRoute;
  response: Response;
}
