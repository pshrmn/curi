import { Route } from "@curi/types";

function ancestors(route: Route): Array<Route> {
  const ancestors = [];
  let parent: Route | undefined = route.parent;
  while (parent !== undefined) {
    ancestors.unshift(parent);
    parent = parent.parent;
  }
  return ancestors;
}

export default ancestors;
