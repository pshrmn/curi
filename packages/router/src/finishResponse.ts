import { History } from "@hickory/root";
import { Interactions } from "./types/interaction";
import {
  Response,
  RedirectLocation,
  SettableResponseProperties
} from "./types/response";
import { ResolveResults } from "./types/route";
import { Match } from "./types/match";

function createRedirect<Q>(
  redirectTo: any,
  interactions: Interactions,
  history: History<Q>
): RedirectLocation<Q> {
  const { name, params, query, hash, state } = redirectTo;
  const pathname = interactions.pathname(name, params);
  return {
    name,
    params,
    pathname,
    query,
    hash,
    state,
    url: history.toHref({ pathname, query, hash, state })
  };
}

export default function finishResponse<Q>(
  routeMatch: Match<Q>,
  interactions: Interactions,
  resolvedResults: ResolveResults | null,
  history: History<Q>,
  external: any
): Response<Q> {
  const { route, match } = routeMatch;
  const response: Response<Q> = match;
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
    keyof Response<Q> & keyof SettableResponseProperties
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
