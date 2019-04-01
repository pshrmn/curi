import { Route } from "@curi/types";
import { Match } from "./types/match";
import { ResolveResults, AsyncRoute } from "./types/route";

export default function resolve_route(
  match: Match,
  global: any
): Promise<ResolveResults> {
  if (!is_async_route(match.route.public)) {
    return Promise.resolve({ resolved: null, error: "No resolve function" });
  }

  const { resolve } = match.route.public;

  return resolve(match.match, global).then(
    resolved => ({ resolved, error: null }),
    error => ({ error, resolved: null })
  );
}

function is_async_route(route: Route): route is AsyncRoute {
  return typeof route.resolve !== "undefined";
}
