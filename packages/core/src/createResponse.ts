import { HickoryLocation, ToArgument } from '@hickory/root';
import { Route, ParamParsers } from './createRoute';
import { RawParams, Params } from './interface';

export interface BaseResponse {
  key: string;
  location: HickoryLocation;
  status: number;
  data: any;
  title: string;
  body: any;
}

export interface Response extends BaseResponse {
  name: string;
  partials: Array<string>;
  params: Params;
  error: any;
}

export interface RedirectResponse extends BaseResponse {
  redirectTo: any;
}

export type AnyResponse = Response | RedirectResponse;

export interface Match {
  route: Route;
  params: Params;
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

class ResponseCreator {
  key: string;
  location: HickoryLocation;
  status: number;
  matches: Array<Match>;
  route: Route;
  partials: Array<string>;
  params: Params;
  body: any;
  data: any;
  redirectTo: any;
  error: any;

  constructor(key: string, location: HickoryLocation) {
    this.key = key;
    this.location = location;
    this.status = 200;
    this.matches = [];
    // properties to be set once we have
    // finished walking over the routes
    this.route;
    this.partials = [];
    this.params = {};
    this.body;
  }

  redirect(to: ToArgument, code: number = 301): void {
    this.setStatus(code);
    this.redirectTo = to;
  }

  fail(err: any): void {
    this.error = err;
  }

  setStatus(code: number): void {
    this.status = code;
  }

  push(route: Route, params: RawParams): void {
    this.matches.push({ route, params });
  }

  pop(): void {
    this.matches.pop();
  }

  setData(data: any): void {
    this.data = data;
  }

  freezeMatch(): void {
    if (this.matches.length) {
      const parsers: ParamParsers = {};
      const bestMatch: Match = this.matches.pop();
      this.matches.forEach(m => {
        this.partials.push(m.route.name);

        Object.assign(this.params, parseParams(m.params, m.route.paramParsers));
      });

      this.route = bestMatch.route;
      Object.assign(
        this.params,
        parseParams(bestMatch.params, bestMatch.route.paramParsers)
      );
    }
  }

  generateTitle(): string {
    if (!this.route || !this.route.title) {
      return '';
    }
    return typeof this.route.title === 'function'
      ? this.route.title(this.params, this.data)
      : this.route.title;
  }

  asObject(): AnyResponse {
    const sharedResponse: BaseResponse = {
      key: this.key,
      location: this.location,
      status: this.status,
      data: this.data,
      title: this.generateTitle(),
      body: this.route && this.route.getBody()
    };

    if (this.redirectTo != null) {
      return {
        ...sharedResponse,
        redirectTo: this.redirectTo
      } as RedirectResponse;
    }

    return {
      ...sharedResponse,
      name: this.route ? this.route.name : undefined,
      partials: this.partials,
      params: this.params,
      error: this.error
    } as Response;
  }
}

export default ResponseCreator;
