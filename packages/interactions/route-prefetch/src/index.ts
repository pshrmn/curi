import {
  Route,
  IntrinsicResponse,
  ResolveResults,
  AsyncRoute
} from "@curi/types";

export interface PrefetchCallOptions {
  match?: IntrinsicResponse;
  external?: any;
}

export default function prefetch(
  route: Route,
  options: PrefetchCallOptions = {}
): Promise<ResolveResults> {
  if (!route.methods.resolve) {
    return Promise.resolve({
      resolved: null,
      error: `Could not prefetch data for ${
        route.meta.name
      } because it does not have a resolve function.`
    });
  }
  return (route as AsyncRoute).methods
    .resolve(options.match, options.external)
    .then(
      resolved => ({ resolved, error: null }),
      error => ({ error, resolved: null })
    );
}
