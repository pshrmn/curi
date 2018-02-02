import { RegExpOptions, Key } from "path-to-regexp";

import { CuriRouter } from "./curi";
import { Params } from "./response";

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface RouteProps {
  params: object;
  location: object;
  name: string;
}

export interface ResponseSetters {
  error: (err: any) => void;
  redirect: (to: any, status?: number) => void;
  data: (data: any) => void;
  status: (status: number) => void;
  body: (body: any) => void;
  title: (title: string) => void;
}

export interface ResponseBuilder {
  error: any;
  resolved: any;
  route: RouteProps;
  set: ResponseSetters;
  router: CuriRouter;
}

export type EveryMatchFn = (route?: RouteProps) => Promise<any>;
export type InitialMatchFn = () => Promise<any>;
export type ResponseMatchFn = (props: ResponseBuilder) => void;

export interface MatchFns {
  initial?: InitialMatchFn;
  every?: EveryMatchFn;
  response?: ResponseMatchFn;
}

export interface RouteDescriptor {
  name: string;
  path: string;
  pathOptions?: RegExpOptions;
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  match?: MatchFns;
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
  match: MatchFns;
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
  match: InternalMatch;
  paramParsers: ParamParsers;
}

export interface Match {
  route: InternalRoute;
  params: Params;
}
