import {
  Interaction,
  Route,
  MatchResponseProperties,
  ResolveResults,
  AsyncRoute,
  AsyncMatchFn
} from "@curi/router";

export interface PrefetchCallOptions<Q> {
  match?: MatchResponseProperties<Q>;
  external?: any;
}

export default function prefetchRoute<Q>(): Interaction {
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
      options: PrefetchCallOptions<Q> = {}
    ): Promise<ResolveResults> => {
      if (loaders[name] == null) {
        return Promise.resolve({
          error: `Could not prefetch data for ${name} because it is not registered.`,
          resolved: null
        });
      }
      return loaders[name](options.match, options.external).then(
        resolved => ({ resolved, error: null }),
        error => ({ error, resolved: null })
      );
    },
    reset() {
      loaders = {};
    }
  };
}
