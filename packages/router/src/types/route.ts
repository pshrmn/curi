import { RegExpOptions, Key, PathFunction } from "path-to-regexp";

import {
  MatchResponseProperties,
  SettableResponseProperties
} from "./response";

export interface Resolved {
  [key: string]: any;
}
export interface ResolveResults {
  resolved: Resolved | null;
  error: any;
}

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface ResponseBuilder {
  resolved: Resolved | null;
  error: any;
  match: MatchResponseProperties;
  globals: any;
}

export type ResponseFn = (props: ResponseBuilder) => SettableResponseProperties;

export type AsyncMatchFn = (
  matched?: MatchResponseProperties,
  globals?: any
) => Promise<any>;
export interface AsyncGroup {
  [key: string]: AsyncMatchFn;
}

export interface RouteDescriptor {
  name: string;
  path: string;
  pathOptions?: RegExpOptions;
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  response?: ResponseFn;
  resolve?: AsyncGroup;
  extra?: { [key: string]: any };
}

export interface CompiledRoute {
  public: Route;
  sync: boolean;
  children: Array<CompiledRoute>;
  response?: ResponseFn;
  pathMatching: PathMatching;
  paramParsers?: ParamParsers;
}

/*
 * These are the route properties that will be available
 * to route interactions
 */
export interface Route {
  name: string;
  path: string;
  keys: Array<string | number>;
  resolve: AsyncGroup;
  extra?: { [key: string]: any };
  pathname: PathFunction;
}

export interface PathMatching {
  mustBeExact: boolean;
  re: RegExp;
  keys: Array<Key>;
}

export type CompiledRouteArray = Array<CompiledRoute>;
export type UserRoutes = Array<CompiledRoute | RouteDescriptor>;
