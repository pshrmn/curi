import { History } from "@hickory/root";
import { Interactions } from "./types/interaction";
import {
  Response,
  RedirectLocation,
  SettableResponseProperties
} from "./types/response";
import { ResolveResults } from "./types/route";
import { Match } from "./types/match";

function createRedirect(
  redirectTo: any,
  interactions: Interactions,
  history: History
): RedirectLocation {
  const { name, params, query, hash, state } = redirectTo;
  const pathname = interactions.pathname(name, params);
  return {
    name,
    params,
    pathname,
    query,
    hash,
    state,
    url: history.to_href({ pathname, query, hash, state })
  };
}

export default function finishResponse(
  routeMatch: Match,
  interactions: Interactions,
  resolvedResults: ResolveResults | null,
  history: History,
  external: any
): Response {
  const { route, match } = routeMatch;
  const response: Response = match;
  if (!route.response) {
    return response;
  }

  const { resolved = null, error = null } = resolvedResults || {};

  const responseModifiers = route.response({
    resolved,
    error,
    match,
    external
  });

  if (!responseModifiers) {
    return response;
  }

  const settableProperties: Array<
    keyof Response & keyof SettableResponseProperties
  > = ["status", "error", "body", "data", "title", "redirectTo"];

  // only merge the valid properties onto the response
  settableProperties.forEach(p => {
    if (responseModifiers.hasOwnProperty(p)) {
      if (p === "redirectTo") {
        // special case
        response[p] = createRedirect(
          responseModifiers[p],
          interactions,
          history
        );
      } else {
        response[p] = responseModifiers[p];
      }
    }
  });
  return response;
}
