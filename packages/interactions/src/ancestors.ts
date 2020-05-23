import { Route } from "@curi/types";

let ancestors = (route: Route): Route[] => {
  let ancestors = [];
  let parent: Route | undefined = route.parent;
  while (parent !== undefined) {
    ancestors.unshift(parent);
    parent = parent.parent;
  }
  return ancestors;
};

export default ancestors;
