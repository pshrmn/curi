import {
  Route,
  Response,
  Params,
  IntrinsicResponse,
  ResolveResults,
  AsyncRoute
} from "@curi/types";
import { SessionLocation } from "@hickory/root";

export let pathname = (route: Route, params?: Params) => {
  return route.methods.pathname(params);
};

type ValidateComponents = (l: SessionLocation) => boolean;

interface ActiveCheckOptions {
  params?: Params;
  partial?: boolean;
  components?: ValidateComponents;
}

let find = (name: string, children: Route[]): boolean => {
  return children.some(node => {
    if (node.name === name) {
      return true;
    } else if (node.children) {
      return find(name, node.children);
    }
    return false;
  });
};

export let active = (
  route: Route,
  response: Response,
  options: ActiveCheckOptions = {}
) => {
  if (
    response.name !== route.name &&
    (!options.partial || !find(response.name, route.children))
  ) {
    return false;
  }
  let keys = route.keys;
  if (keys.length) {
    if (!options.params) {
      return false;
    }
    for (let key of keys) {
      let param = options.params[key];
      if (!param || param !== response.params[key]) {
        return false;
      }
    }
  }
  if (options.components) {
    return options.components(response.location);
  }
  return true;
};

export let ancestors = (route: Route): Route[] => {
  let ancestors = [];
  let parent: Route | undefined = route.parent;
  while (parent !== undefined) {
    ancestors.unshift(parent);
    parent = parent.parent;
  }
  return ancestors;
};
interface PrefetchCallOptions {
  match?: IntrinsicResponse;
  external?: any;
}

export let prefetch = (
  route: Route,
  options: PrefetchCallOptions = {}
): Promise<ResolveResults> => {
  if (!route.methods.resolve) {
    return Promise.resolve({
      resolved: null,
      error: `Could not prefetch data for ${
        route.name
      } because it does not have a resolve function.`
    });
  }
  return (route as AsyncRoute).methods
    .resolve(options.match, options.external)
    .then(
      resolved => ({ resolved, error: null }),
      error => ({ error, resolved: null })
    );
};
