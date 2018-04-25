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
  if (!route.response) {
    return match as Response;
  }

  const responseModifiers = route.response({
    resolved,
    match,
    route: interactions
  });
  if (!responseModifiers) {
    return match as Response;
  }

  const settableProperties = [
    "status",
    "error",
    "body",
    "data",
    "title",
    "redirectTo"
  ];
  const response: Response = match;
  // only merge the valid properties onto the response
  settableProperties.forEach(
    (p: keyof Response & keyof SettableResponseProperties) => {
      if (responseModifiers.hasOwnProperty(p)) {
        if (p === "redirectTo") {
          // special case
          response[p] = createRedirect(responseModifiers[p], interactions);
        } else {
          response[p] = responseModifiers[p];
        }
      }
    }
  );
  return response as Response;
}
