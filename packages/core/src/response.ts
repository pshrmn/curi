import { HickoryLocation, ToArgument } from '@hickory/root';
import { InternalRoute, ParamParsers, RouteProps } from './route';
import matchRoute, { Match } from './utils/match';
import { RawParams, Params, Addons } from './interface';

export interface ResponseProps {
  location: HickoryLocation;
  params: Params;
  partials: Array<string>;
  status: number;
  body: any;
  data: any;
  error?: any;
  redirectTo?: ToArgument;
}

export interface ResolvedObject {
  initial: any;
  every: any;
}

export interface PendingResponse {
  error?: any;
  resolved?: ResolvedObject;
  route: InternalRoute;
  props: ResponseProps;
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

export function createResponse(
  location: HickoryLocation,
  routes: Array<InternalRoute>
): Promise<PendingResponse> {
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
    body: undefined,
    data: undefined
  };

  return loadRoute(route, props);
}

/*
 * This will call any initial/every match functions for the matching route
 */
function loadRoute(
  route: InternalRoute,
  props: ResponseProps
): Promise<PendingResponse> {
  if (!route) {
    return Promise.resolve({
      route,
      props
    });
  }
  const { match } = route.public;
  return Promise.all([
    match.initial ? match.initial() : undefined,
    match.every ? match.every(routeProperties(route, props)) : undefined
  ]).then(
    ([ initial, every ]) => {
      return {
        route,
        props,
        error: null,
        resolved: { initial, every }
      };
    },
    err => {
      // when there is an uncaught error, set it on the response
      return {
        route,
        props,
        error: err,
        resolved: null
      };
    }
  );
}

function responseSetters(props: ResponseProps) {
  return {
    redirect(to: ToArgument, code: number = 301): void {
      props.status = code;
      props.redirectTo = to;
    },

    error(err: any): void {
      props.error = err;
    },

    status(code: number): void {
      props.status = code;
    },

    data(data: any): void {
      props.data = data;
    },

    body(body: any): void {
      props.body = body;
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
    title: ''
  };
}

function freezeResponse(route: InternalRoute, props: ResponseProps): Response {
  const response: Response = Object.assign(
    {},
    props,
    { key: props.location.key },
    route ? route.responseProps(props) : missProps()
  );

  return response;
}

export function finishResponse(
  pending: PendingResponse,
  addons: Addons
): Response {
  const { error, resolved, route, props } = pending;
  if (route && route.public.match.response) {
    route.public.match.response({
      error,
      resolved,
      route: routeProperties(route, props),
      set: responseSetters(props),
      addons
    });
  }
  return freezeResponse(route, props);
}
