import { Params } from "./response";

export interface RouteLocation {
  name?: string;
  params?: Params;
  hash?: string;
  query?: any;
  state?: any;
}
