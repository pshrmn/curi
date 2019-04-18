import { isExternalRedirect } from "./redirect";

import { History } from "@hickory/root";
import {
  RouteMatcher,
  Response,
  RedirectLocation,
  SettableResponseProperties,
  ResolveResults,
  IntrinsicResponse,
  Route,
  RedirectProps,
  ExternalRedirect
} from "@curi/types";

export default function finishResponse(
  route: Route,
  match: IntrinsicResponse,
  routes: RouteMatcher,
  resolvedResults: ResolveResults | null,
  history: History,
  external: any
): Response {
  const { resolved = null, error = null } = resolvedResults || {};

  const response: Response = {} as Response;
  for (let key in match) {
    response[key as keyof Response] = match[key as keyof IntrinsicResponse];
  }

  if (!route.response) {
    return response;
  }

  const responseModifiers = route.response({
    resolved,
    error,
    match,
    external
  });

  if (!responseModifiers) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `"${
          match.name
        }"'s response function did not return anything. Did you forget to include a return statement?`
      );
    }
    return response;
  }

  for (let key in responseModifiers) {
    if (validResponseProperty(key)) {
      const value = responseModifiers[key];
      if (value === undefined) {
        continue;
      }
      response[key] =
        key === "redirect"
          ? createRedirect(value, routes, history)
          : responseModifiers[key];
    }
  }

  return response;
}

const validProperties: {
  [key in keyof SettableResponseProperties]: boolean
} = {
  meta: true,
  body: true,
  data: true,
  redirect: true
};

function validResponseProperty(
  property: string
): property is keyof SettableResponseProperties {
  if (process.env.NODE_ENV !== "production") {
    if (!validProperties.hasOwnProperty(property)) {
      console.warn(`"${property}" is not a valid response property. The valid properties are:

${Object.keys(validProperties).join(", ")}`);
    }
  }
  return validProperties.hasOwnProperty(property);
}

function createRedirect(
  redirect: RedirectProps | ExternalRedirect,
  routes: RouteMatcher,
  history: History
): RedirectLocation | ExternalRedirect {
  if (isExternalRedirect(redirect)) {
    return redirect;
  }
  const { name, params, query, hash, state } = redirect;
  const pathname = routes.interactions.pathname(name, params);
  return {
    name,
    params,
    pathname,
    query,
    hash,
    state,
    url: history.href({ pathname, query, hash, state })
  };
}
