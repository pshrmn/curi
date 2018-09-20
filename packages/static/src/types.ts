import { Params, RouterOptions } from "@curi/router";

export interface PageDescriptor {
  name: string;
  params?: Params;
}

export type GetRouterOptions = () => RouterOptions;
