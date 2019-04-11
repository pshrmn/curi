import { History } from "@hickory/root";
import {
  Interactions,
  Response,
  RedirectLocation,
  SettableResponseProperties,
  ResolveResults,
  IntrinsicResponse,
  ResponseFn
} from "@curi/types";

function createRedirect(
  redirect: any,
  interactions: Interactions,
  history: History
): RedirectLocation {
  const { name, params, query, hash, state } = redirect;
  const pathname = interactions.pathname(name, params);
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

const validProperties: {
  [key in keyof SettableResponseProperties]: boolean
} = {
  status: true,
  error: true,
  body: true,
  data: true,
  title: true,
  redirect: true
};

function validResponseProperty(
  property: string
): property is keyof SettableResponseProperties {
  if (process.env.NODE_ENV !== "production") {
    if (!validProperties.hasOwnProperty(property)) {
      console.warn(`"${property}" is not a valid response property. The valid properties are:

status, error, body, data, title, redirect`);
    }
  }
  return validProperties.hasOwnProperty(property);
}

export default function finishResponse(
  createResponse: ResponseFn,
  match: IntrinsicResponse,
  interactions: Interactions,
  resolvedResults: ResolveResults | null,
  history: History,
  external: any
): Response {
  const { resolved = null, error = null } = resolvedResults || {};

  const responseModifiers = createResponse({
    resolved,
    error,
    match,
    external
  });

  if (!responseModifiers) {
    return match;
  }

  // only merge the valid properties onto the response
  return Object.keys(responseModifiers).reduce(
    (acc, key) => {
      if (validResponseProperty(key)) {
        if (key === "redirect") {
          // special case
          acc[key] = createRedirect(
            responseModifiers[key],
            interactions,
            history
          );
        } else {
          acc[key] = responseModifiers[key];
        }
      }
      return acc;
    },
    match as Response
  );
}
