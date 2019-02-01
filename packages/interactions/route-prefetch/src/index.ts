import {
  Interaction,
  Route,
  MatchResponseProperties,
  ResolveResults,
  AsyncRoute,
  AsyncMatchFn
} from "@curi/router";

export default function prefetchRoute(): Interaction {
  let loaders: { [key: string]: AsyncMatchFn } = {};

  return {
    name: "prefetch",
    register: (route: Route) => {
      if (route.resolve === undefined) {
        return;
      }
      const { name, resolve } = <AsyncRoute>route;
      if (resolve) {
        loaders[name] = resolve;
      }
    },
    get: (
      name: string,
      props?: MatchResponseProperties,
      external?: any
    ): Promise<ResolveResults> => {
      if (loaders[name] == null) {
        return Promise.resolve({
          error: `Could not prefetch data for ${name} because it is not registered.`,
          resolved: null
        });
      }
      return loaders[name](props, external).then(
        resolved => ({ resolved, error: null }),
        error => ({ error, resolved: null })
      );
    },
    reset() {
      loaders = {};
    }
  };
}
