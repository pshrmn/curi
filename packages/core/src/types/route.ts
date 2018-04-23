import { RegExpOptions, Key } from "path-to-regexp";

import { LocationDetails } from "@hickory/root";
import { Params, Response, Resolved, ResponseModifiers } from "./response";
import { Interactions } from "./interaction";

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface MatchedRouteProps {
  params: object;
  location: object;
  name: string;
}

export interface ResponseBuilder extends MatchedRouteProps {
  resolved: Resolved | null;
  route: Interactions;
}

export type EveryMatchFn = (matched?: MatchedRouteProps) => Promise<any>;
export type InitialMatchFn = () => Promise<any>;
export type ResponseFn = (props: ResponseBuilder) => ResponseModifiers;

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
 * to route interactions
 */
export interface Route {
  name: string;
  path: string;
  keys: Array<string | number>;
  on: OnFns;
  extra?: { [key: string]: any };
}

export interface PathMatching {
  mustBeExact: boolean;
  re: RegExp;
  keys: Array<Key>;
}

export interface InternalRoute {
  public: Route;
  children: Array<InternalRoute>;
  response?: ResponseFn;
  pathMatching: PathMatching;
  paramParsers?: ParamParsers;
}
