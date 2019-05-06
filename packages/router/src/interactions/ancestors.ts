import { Route } from "@curi/types";

function ancestors(route: Route, level: number): string;
function ancestors(route: Route): Array<string>;
function ancestors(route: Route, level?: number) {
  if (!route.meta.ancestors.length) {
    return;
  }
  if (level == null) {
    return route.meta.ancestors.slice();
  }
  if (level <= 0) {
    return;
  }
  return route.meta.ancestors[route.meta.ancestors.length - level];
}

export default ancestors;
