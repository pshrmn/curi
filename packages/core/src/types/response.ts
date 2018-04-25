import { HickoryLocation, PartialLocation } from "@hickory/root";

import { InternalRoute } from "./route";

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

export interface MatchResponseProperties {
  location: HickoryLocation;
  key: string;
  name: string;
  params: Params;
  partials: Array<string>;
}

export interface SettableResponseProperties {
  status?: number;
  error?: any;
  body?: any;
  data?: any;
  title?: string;
  redirectTo?: RedirectProps;
}

export interface Response extends MatchResponseProperties {
  status?: number;
  error?: any;
  body?: any;
  data?: any;
  title?: string;
  redirectTo?: PartialLocation;
}

export interface Resolved {
  error: any;
  initial: any;
  every: any;
}

export interface RedirectProps {
  name: string;
  params?: Params;
  hash?: string;
  query?: any;
  state?: any;
}
