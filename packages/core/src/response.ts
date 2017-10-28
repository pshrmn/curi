import { HickoryLocation, ToArgument } from '@hickory/root';
import { Route, ParamParsers, Match } from './route';
import { RawParams, Params, Addons } from './interface';

export interface ResponseProps {
  location: HickoryLocation;
  params: Params;
  partials: Array<string>;
  status: number;
  data: any;
  error?: any;
  redirectTo?: ToArgument;
}

// this is a response object that will be emited
export interface Response {
  key: string;
  location: HickoryLocation;
  status: number;
  data: any;
  title: string;
  body: any;
  name?: string;
  partials?: Array<string>;
  params?: Params;
  error?: any;
  redirectTo?: any;
}

function generateTitle(route: Route, props: ResponseProps): string {
  if (!route || !route.title) {
    return '';
  }
  return typeof route.title === 'function'
    ? route.title(props.params, props.data)
    : route.title;
}

function parseParams(params: RawParams, fns: ParamParsers): Params {
  if (!fns) {
    return params;
  }
  const output: Params = {};
  // For each param, attempt to parse it. However, if that
  // fails, fall back to the string value.
  for (let key in params) {
    let value = params[key];
    let fn = fns[key];
    if (fn) {
      try {
        value = fn(value);
      } catch (e) {
        console.error(e);
        value = params[key];
      }
    }
    output[key] = value;
  }
  return output;
}

function createResponse(
  location: HickoryLocation,
  routes: Array<Route>,
  addons: Addons
): Promise<Response> {
  let matches: Array<Match> = [];
  let partials: Array<string> = [];
  let params: Params = {};
  let route: Route;

  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  routes.some(route => route.match(location.pathname, matches));
  if (matches.length) {
    const bestMatch: Match = matches.pop();

    matches.forEach(m => {
      partials.push(m.route.name);
      Object.assign(params, parseParams(m.params, m.route.paramParsers));
    });

    route = bestMatch.route;
    Object.assign(params, parseParams(bestMatch.params, route.paramParsers));
  }
  // start building the properties of the response object
  const props: ResponseProps = {
    location,
    params,
    partials,
    status: route != null ? 200 : 404,
    data: undefined
  };

  return loadRoute(route, props, addons).then(props =>
    freezeResponse(route, props)
  );
}

/*
 * This will call any load/preload functions for the matching route
 */
function loadRoute(
  route: Route,
  props: ResponseProps,
  addons: Addons
): Promise<ResponseProps> {
  if (!route) {
    return Promise.resolve(props);
  }
  return Promise.all([
    route.preload ? route.preload() : null,
    route.load
      ? route.load(
          routeProperties(route, props),
          responseModifiers(props),
          addons
        )
      : null
  ]).then(() => Promise.resolve(props));
}

function responseModifiers(props: ResponseProps) {
  return {
    redirect(to: ToArgument, code: number = 301): void {
      props.status = code;
      props.redirectTo = to;
    },

    fail(err: any): void {
      props.error = err;
    },

    setStatus(code: number): void {
      props.status = code;
    },

    setData(data: any): void {
      props.data = data;
    }
  };
}

function routeProperties(route: Route, props: ResponseProps) {
  return {
    params: props.params,
    location: props.location,
    name: route.name
  };
}

function freezeResponse(route: Route, props: ResponseProps): Promise<Response> {
  const response: Response = {
    ...props,
    key: props.location.key,
    body: route && route.getBody(),
    title: generateTitle(route, props),
    name: route && route.name
  };

  return Promise.resolve(response);
}

export default createResponse;
