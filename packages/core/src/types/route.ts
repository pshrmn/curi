import { RegExpOptions, Key } from "path-to-regexp";

import { LocationDetails } from "@hickory/root";
import { Params, Response, LoadResults } from "./response";
import { Addons } from "./addon";

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface RouteProps {
  params: object;
  location: object;
  name: string;
}

export interface RedirectProps extends LocationDetails {
  name: string;
  params?: Params;
  status?: number;
}

export interface ResponseSetters {
  error: (err: any) => void;
  redirect: (props: RedirectProps) => void;
  data: (data: any) => void;
  status: (status: number) => void;
  body: (body: any) => void;
  title: (title: string) => void;
}

export interface ResponseBuilder {
  load: LoadResults;
  route: RouteProps;
  set: ResponseSetters;
  addons: Addons;
}

export type EveryMatchFn = (route?: RouteProps) => Promise<any>;
export type InitialMatchFn = () => Promise<any>;
export type ResponseFn = (props: ResponseBuilder) => void;

export interface OnFns {
  initial?: InitialMatchFn;
  every?: EveryMatchFn;
}

export interface RouteDescriptor {
  name: string;
  path: string;
  pathOptions?: RegExpOptions;
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  response?: ResponseFn;
  on?: OnFns;
  extra?: { [key: string]: any };
}

/*
 * These are the route properties that will be available
 * to addons
 */
export interface Route {
  name: string;
  path: string;
  keys: Array<string | number>;
  on: OnFns;
  extra: { [key: string]: any };
}

export interface InternalMatch {
  mustBeExact: boolean;
  re: RegExp;
  keys: Array<Key>;
}

export interface InternalRoute {
  public: Route;
  children: Array<InternalRoute>;
  response: ResponseFn;
  pathMatching: InternalMatch;
  paramParsers: ParamParsers;
}

export interface MatchingRoute {
  route: InternalRoute;
  params: Params;
}

export interface BestMatch {
  route: InternalRoute;
  response: Response;
}
