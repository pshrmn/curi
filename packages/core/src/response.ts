import { HickoryLocation, ToArgument } from '@hickory/root';
import { InternalRoute, ParamParsers, RouteProps } from './route';
import matchRoute, { Match } from './utils/match';
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
  routes: Array<InternalRoute>,
  addons: Addons
): Promise<Response> {
  let matches: Array<Match> = [];
  let partials: Array<string> = [];
  let params: Params = {};
  let route: InternalRoute;

  // determine which route(s) match, then use the exact match
  // as the matched route and the rest as partial routes
  routes.some(route => matchRoute(route, location.pathname, matches));
  if (matches.length) {
    const bestMatch: Match = matches.pop();

    matches.forEach(m => {
      partials.push(m.route.public.name);
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
  route: InternalRoute,
  props: ResponseProps,
  addons: Addons
): Promise<ResponseProps> {
  if (!route) {
    return Promise.resolve(props);
  }
  return Promise.all([
    route.public.preload ? route.public.preload() : null,
    route.public.load
      ? route.public.load(
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

function routeProperties(route: InternalRoute, props: ResponseProps) {
  return {
    params: props.params,
    location: props.location,
    name: route.public.name
  };
}

function missProps(): RouteProps {
  return {
    body: undefined,
    title: ''
  };
}

function freezeResponse(
  route: InternalRoute,
  props: ResponseProps
): Promise<Response> {
  const response: Response = Object.assign(
    {},
    props,
    { key: props.location.key },
    route ? route.responseProps(props) : missProps()
  );

  return Promise.resolve(response);
}

export default createResponse;
