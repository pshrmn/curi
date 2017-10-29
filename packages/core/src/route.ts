import { HickoryLocation, ToArgument } from '@hickory/root';
import PathToRegexp, { RegExpOptions, Key } from 'path-to-regexp';

import once from './utils/once';

import { LoadFn, PreloadFn } from './interface';
import { ResponseProps } from './response';

export type Title = string | ((params?: object, data?: any) => string);

export type ParamParser = (input: string) => any;
export interface ParamParsers {
  [key: string]: ParamParser;
}

export interface RouteProps {
  body: any;
  title: string;
  name?: string;
}

export interface RouteDescriptor {
  name: string;
  path: string;
  pathOptions?: RegExpOptions;
  params?: ParamParsers;
  body?: () => any;
  children?: Array<RouteDescriptor>;
  preload?: PreloadFn;
  load?: LoadFn;
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
  body: () => any;
  keys: Array<string | number>;
  preload: PreloadFn;
  load: LoadFn;
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
    body,
    children: descriptorChildren = [],
    preload,
    load,
    title,
    extra,
    params: paramParsers
  } =
    options || <RouteDescriptor>{};

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
      body,
      keys: keys.map(key => key.name),
      preload: preload && once(preload),
      load,
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
        body: this.public.body && this.public.body(),
        title: generateTitle(title, props)
      };
    }
  };
};

export default createRoute;
