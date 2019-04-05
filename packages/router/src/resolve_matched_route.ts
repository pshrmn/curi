import {
  Route,
  ResolveResults,
  AsyncRoute,
  IntrinsicResponse
} from "@curi/types";

export function resolve_route(
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

export function is_async_route(route: Route): route is AsyncRoute {
  return typeof route.resolve !== "undefined";
}
