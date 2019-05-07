import { Route, Params } from "@curi/types";

export default function pathname(route: Route, params?: Params): string {
  return route.methods.pathname(params);
}
