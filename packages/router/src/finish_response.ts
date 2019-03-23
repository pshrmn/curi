import { History } from "@hickory/root";
import { Interactions } from "./types/interaction";
import {
  Response,
  RedirectLocation,
  SettableResponseProperties
} from "./types/response";
import { ResolveResults } from "./types/route";
import { Match } from "./types/match";

function create_redirect(
  redirect_to: any,
  interactions: Interactions,
  history: History
): RedirectLocation {
  const { name, params, query, hash, state } = redirect_to;
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

export default function finish_response(
  route_match: Match,
  interactions: Interactions,
  resolved_results: ResolveResults | null,
  history: History,
  external: any
): Response {
  const { route, match } = route_match;
  const response: Response = match;
  if (!route.response) {
    return response;
  }

  const { resolved = null, error = null } = resolved_results || {};

  const response_modifiers = route.response({
    resolved,
    error,
    match,
    external
  });

  if (!response_modifiers) {
    return response;
  }

  const settable_properties: Array<
    keyof Response & keyof SettableResponseProperties
  > = ["status", "error", "body", "data", "title", "redirect_to"];

  // only merge the valid properties onto the response
  settable_properties.forEach(p => {
    if (response_modifiers.hasOwnProperty(p)) {
      if (p === "redirect_to") {
        // special case
        response[p] = create_redirect(
          response_modifiers[p],
          interactions,
          history
        );
      } else {
        response[p] = response_modifiers[p];
      }
    }
  });
  return response;
}
