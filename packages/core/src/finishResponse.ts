import { Interactions } from "./types/interaction";
import {
  Response,
  Resolved,
  GenericResponse,
  ModifiableResponseProperties
} from "./types/response";
import { Match } from "./types/match";
import { ToArgument } from "@hickory/root";

function createRedirect(
  redirectTo: any,
  interactions: Interactions
): ToArgument {
  const { name, params, ...rest } = redirectTo;
  const pathname = interactions.pathname(name, params);
  return {
    pathname,
    ...rest
  };
}

export default function finishResponse(
  match: Match,
  interactions: Interactions,
  resolved: Resolved | null
): Response {
  const { route, response } = match;
  if (!route.response) {
    return response as Response;
  }

  const responseModifiers = route.response({
    resolved,
    name: response.name,
    params: { ...response.params },
    location: response.location,
    route: interactions
  });
  if (!responseModifiers) {
    return response as Response;
  }

  const settableProperties = [
    "status",
    "error",
    "body",
    "data",
    "title",
    "redirectTo"
  ];
  // only merge the valid properties onto the response
  settableProperties.forEach(
    (p: keyof GenericResponse & keyof ModifiableResponseProperties) => {
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
