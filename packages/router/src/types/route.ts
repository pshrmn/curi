import { RegExpOptions, Key, PathFunction } from "path-to-regexp";

import {
  MatchResponseProperties,
  SettableResponseProperties
} from "./response";

export interface ResolveResults {
  resolved: any;
  error: any;
}

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface ResponseBuilder {
  resolved: any;
  error: any;
  match: MatchResponseProperties;
  external: any;
}

export type ResponseFn = (
  props: Readonly<ResponseBuilder>
) => SettableResponseProperties;

export type AsyncMatchFn = (
  matched?: Readonly<MatchResponseProperties>,
  external?: any
) => Promise<any>;

export interface RouteDescriptor {
  name: string;
  path: string;
  path_options?: RegExpOptions;
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  response?: ResponseFn;
  resolve?: AsyncMatchFn;
  extra?: { [key: string]: any };
}

export interface CompiledRoute {
  public: Route;
  sync: boolean;
  children: Array<CompiledRoute>;
  response?: ResponseFn;
  path_matching: PathMatching;
  param_parsers?: ParamParsers;
}

/*
 * These are the route properties that will be available
 * to route interactions
 */
export interface Route<R = unknown> {
  name: string;
  path: string;
  keys: Array<string | number>;
  extra?: {
    [key: string]: any;
  };
  pathname: PathFunction;
  resolve: R;
}
export interface SyncRoute extends Route<undefined> {}
export interface AsyncRoute extends Route<AsyncMatchFn> {}

export interface PathMatching {
  exact: boolean;
  re: RegExp;
  keys: Array<Key>;
}

export type CompiledRouteArray = Array<CompiledRoute>;
