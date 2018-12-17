import { RouteDescriptor, Params, Emitted, RouterOptions } from "@curi/router";

export interface PageDescriptor {
  name: string;
  params?: Params;
}

export type GetRouterOptions = () => RouterOptions;

export interface StaticOutput {
  render: (emitted: Emitted) => any;
  insert: (markup: any) => string;
  dir: string;
  redirects?: boolean;
}

export interface StaticRouter {
  routes: Array<RouteDescriptor>;
  getRouterOptions?: GetRouterOptions;
}

export interface StaticConfiguration {
  pages: Array<PageDescriptor>;
  router: StaticRouter;
  output: StaticOutput;
}

export interface Result {
  pathname: string;
  success: boolean;
  error?: Error;
}

export interface PathnamesConfiguration {
  routes: Array<RouteDescriptor>;
  pages: Array<PageDescriptor>;
  routerOptions?: RouterOptions;
}
