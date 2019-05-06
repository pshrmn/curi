import { Route } from "@curi/types";

function ancestors(route: Route): Array<Route> {
  const ancestors = [];
  let parent: Route | undefined = route.meta.parent;
  while (parent !== undefined) {
    ancestors.unshift(parent);
    parent = parent.meta.parent;
  }
  return ancestors;
}

export default ancestors;
