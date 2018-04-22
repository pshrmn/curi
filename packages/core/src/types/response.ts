import { HickoryLocation, ToArgument } from "@hickory/root";

import { InternalRoute } from "./route";

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

// the base properties of all responses
export interface GenericResponse {
  location: HickoryLocation;
  key: string;
  status: number;
  title: string;
  name: string;
  params: Params;
  partials: Array<string>;
  body: any;
  data: any;
  error?: any;
  redirectTo?: ToArgument;
}

// the final response's body should match the intended shape
export interface Response<B> extends GenericResponse {
  body: B;
}

export interface Resolved {
  error: any;
  initial: any;
  every: any;
}
