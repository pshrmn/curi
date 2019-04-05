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

function create_redirect(
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

const valid_properties: {
  [key in keyof SettableResponseProperties]: boolean
} = {
  status: true,
  error: true,
  body: true,
  data: true,
  title: true,
  redirect: true
};

function valid_response_property(
  property: string
): property is keyof SettableResponseProperties {
  if (process.env.NODE_ENV !== "production") {
    if (!valid_properties.hasOwnProperty(property)) {
      console.warn(`"${property}" is not a valid response property. The valid properties are:

status, error, body, data, title, redirect`);
    }
  }
  return valid_properties.hasOwnProperty(property);
}

export default function finish_response(
  create_response: ResponseFn,
  match: IntrinsicResponse,
  interactions: Interactions,
  resolved_results: ResolveResults | null,
  history: History,
  external: any
): Response {
  const { resolved = null, error = null } = resolved_results || {};

  const response_modifiers = create_response({
    resolved,
    error,
    match,
    external
  });

  if (!response_modifiers) {
    return match;
  }

  // only merge the valid properties onto the response
  return Object.keys(response_modifiers).reduce(
    (acc, key) => {
      if (valid_response_property(key)) {
        if (key === "redirect") {
          // special case
          acc[key] = create_redirect(
            response_modifiers[key],
            interactions,
            history
          );
        } else {
          acc[key] = response_modifiers[key];
        }
      }
      return acc;
    },
    match as Response
  );
}
