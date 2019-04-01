import { RegExpOptions, PathFunction } from "path-to-regexp";

import { MatchResponseProperties, ParamParsers, ResponseFn } from "@curi/types";

export interface ResolveResults {
  resolved: any;
  error: any;
}

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
