import { Route, Params } from "@curi/types";

let pathname = (route: Route, params?: Params) => {
  return route.methods.pathname(params);
};

export default pathname;
