import {
  Interaction,
  Route,
  IntrinsicResponse,
  ResolveResults,
  AsyncRoute,
  Resolver
} from "@curi/types";

export interface PrefetchCallOptions {
  match?: IntrinsicResponse;
  external?: any;
}

export default function prefetchRoute(): Interaction {
  let scoped: { [key: string]: Resolver } = {};

  return {
    name: "prefetch",
    register: (route: Route) => {
      if (route.resolve === undefined) {
        return;
      }
      const { name, resolve } = <AsyncRoute>route;
      scoped[name] = resolve;
    },
    get: (
      name: string,
      options: PrefetchCallOptions = {}
    ): Promise<ResolveResults> => {
      if (scoped[name] == null) {
        return Promise.resolve({
          error: `Could not prefetch data for ${name} because it is not registered.`,
          resolved: null
        });
      }
      return scoped[name](options.match, options.external).then(
        resolved => ({ resolved, error: null }),
        error => ({ error, resolved: null })
      );
    }
  };
}
