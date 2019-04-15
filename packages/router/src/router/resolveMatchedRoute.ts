import {
  Route,
  ResolveResults,
  AsyncRoute,
  IntrinsicResponse
} from "@curi/types";

export function resolveRoute(
  route: AsyncRoute,
  match: IntrinsicResponse,
  global: any
): Promise<ResolveResults> {
  return route
    .resolve(match, global)
    .then(
      resolved => ({ resolved, error: null }),
      error => ({ error, resolved: null })
    );
}

export function isAsyncRoute(route: Route): route is AsyncRoute {
  return typeof route.resolve !== "undefined";
}
