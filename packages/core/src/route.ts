import { HickoryLocation, ToArgument } from '@hickory/root';
import PathToRegexp, { RegExpOptions, Key } from 'path-to-regexp';

import once from './utils/once';

import { EveryMatchFn, InitialMatchFn, FinishMatchFn } from './interface';
import { ResponseProps } from './response';

export type Title = string | ((params?: object, data?: any) => string);

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface RouteProps {
  title: string;
  name?: string;
}

export interface MatchFns {
  initial?: InitialMatchFn;
  every?: EveryMatchFn;
  finish?: FinishMatchFn;
}

export interface RouteDescriptor {
  name: string;
  path: string;
  pathOptions?: RegExpOptions;
  params?: ParamParsers;
  children?: Array<RouteDescriptor>;
  match?: MatchFns;
  title?: Title;
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
  responseProps: (props: ResponseProps) => RouteProps;
}

function generateTitle(title: Title, props: ResponseProps): string {
  if (!title) {
    return '';
  }
  return typeof title === 'function' ? title(props.params, props.data) : title;
}

const createRoute = (options: RouteDescriptor): InternalRoute => {
  const {
    name,
    path,
    pathOptions = {},
    children: descriptorChildren = [],
    match = {},
    title,
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
        finish: match.finish
      },
      extra
    },
    match: {
      re,
      keys,
      mustBeExact
    },
    children,
    paramParsers,
    responseProps: function(props: ResponseProps): RouteProps {
      return {
        name,
        title: generateTitle(title, props)
      };
    }
  };
};

export default createRoute;
