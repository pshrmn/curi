import { HickoryLocation, ToArgument } from '@hickory/root';
import PathToRegexp, { RegExpOptions, Key } from 'path-to-regexp';

import once from './utils/once';

import { EveryMatchFn, InitialMatchFn, ResponseMatchFn } from './interface';
import { ResponseProps } from './response';

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

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

const createRoute = (options: RouteDescriptor): InternalRoute => {
  const {
    name,
    path,
    pathOptions = {},
    children: descriptorChildren = [],
    match = {},
    extra,
    params: paramParsers
  } = options;

  // end defaults to true, so end has to be hardcoded for it to be false
  const mustBeExact = pathOptions.end == null || pathOptions.end;

  let children: Array<InternalRoute> = [];
  // when we have child routes, we need to perform non-end matching and
  // create route objects for each child
  if (descriptorChildren.length) {
    pathOptions.end = false;
    children = descriptorChildren.map(createRoute);
  }

  const keys: Array<Key> = [];
  const re = PathToRegexp(path, keys, pathOptions);

  return {
    public: {
      name,
      path: path,
      keys: keys.map(key => key.name),
      match: {
        initial: match.initial && once(match.initial),
        every: match.every,
        response: match.response
      },
      extra
    },
    match: {
      re,
      keys,
      mustBeExact
    },
    children,
    paramParsers
  };
};

export default createRoute;
