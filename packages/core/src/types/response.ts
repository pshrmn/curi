import { HickoryLocation, ToArgument } from '@hickory/root';

import { InternalRoute } from './route';

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

export interface ResponseProps {
  location: HickoryLocation;
  params: Params;
  partials: Array<string>;
  status: number;
  body: any;
  data: any;
  title: string;
  error?: any;
  redirectTo?: ToArgument;
}

export interface ResolvedObject {
  initial: any;
  every: any;
}

export interface PendingResponse {
  error?: any;
  resolved?: ResolvedObject;
  route: InternalRoute;
  props: ResponseProps;
}

// this is a response object that will be emited
export interface Response {
  key: string;
  location: HickoryLocation;
  status: number;
  data: any;
  title: string;
  body: any;
  name?: string;
  partials?: Array<string>;
  params?: Params;
  error?: any;
  redirectTo?: any;
}
