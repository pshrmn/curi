import { Interactions } from "./types/interaction";
import {
  Response,
  Resolved,
  SettableResponseProperties
} from "./types/response";
import { Match } from "./types/match";
import { PartialLocation } from "@hickory/root";

function createRedirect(
  redirectTo: any,
  interactions: Interactions
): PartialLocation {
  const { name, params, ...rest } = redirectTo;
  const pathname = interactions.pathname(name, params);
  return {
    pathname,
    ...rest
  };
}

export default function finishResponse(
  routeMatch: Match,
  interactions: Interactions,
  resolved: Resolved | null
): Response {
  const { route, match } = routeMatch;
  const response: Response = match;
  if (!route.response) {
    return response;
  }

  const responseModifiers = route.response({
    resolved,
    match
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
        response[p] = createRedirect(responseModifiers[p], interactions);
      } else {
        response[p] = responseModifiers[p];
      }
    }
  });
  return response;
}
