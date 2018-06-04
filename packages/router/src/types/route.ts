import { RegExpOptions, Key } from "path-to-regexp";

import { LocationDetails } from "@hickory/root";
import {
  Params,
  Response,
  Resolved,
  MatchResponseProperties,
  SettableResponseProperties
} from "./response";
import { Interactions } from "./interaction";

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface ResponseBuilder {
  resolved: Resolved | null;
  match: MatchResponseProperties;
}

export type ResponseFn = (props: ResponseBuilder) => SettableResponseProperties;

export type EveryMatchFn = (matched?: MatchResponseProperties) => Promise<any>;
export type InitialMatchFn = (
  matched?: MatchResponseProperties
) => Promise<any>;
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
  sync: boolean;
  children: Array<InternalRoute>;
  response?: ResponseFn;
  pathMatching: PathMatching;
  paramParsers?: ParamParsers;
}
