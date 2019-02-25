import { SessionLocation, PartialLocation } from "@hickory/root";
import { RouteLocation } from "./location";

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };

export interface MatchResponseProperties {
  location: SessionLocation;
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

export interface RedirectLocation extends PartialLocation {
  name: string;
  params?: Params;
  url: string;
}

export interface Response extends MatchResponseProperties {
  status?: number;
  error?: any;
  body?: any;
  data?: any;
  title?: string;
  redirectTo?: RedirectLocation;
}

export interface RedirectProps extends RouteLocation {
  name: string;
}
