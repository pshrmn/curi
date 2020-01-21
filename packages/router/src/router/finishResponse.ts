import { isExternalRedirect } from "./typeGuards";

import {
  CuriRouter,
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
  resolvedResults: ResolveResults | null,
  router: CuriRouter,
  external: any
): Response {
  let { resolved = null, error = null } = resolvedResults || {};

  let response: Response = {
    data: undefined,
    body: undefined,
    meta: undefined
  } as Response;
  for (let key in match) {
    response[key as keyof Response] = match[key as keyof IntrinsicResponse];
  }

  if (!route.methods.respond) {
    return response;
  }

  let results = route.methods.respond({
    resolved,
    error,
    match,
    external
  });

  if (!results) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `"${
          match.name
        }"'s response function did not return anything. Did you forget to include a return statement?`
      );
    }
    return response;
  }

  if (process.env.NODE_ENV !== "production") {
    let validProperties: {
      [key in keyof SettableResponseProperties]: boolean
    } = {
      meta: true,
      body: true,
      data: true,
      redirect: true
    };
    Object.keys(results).forEach(property => {
      if (!validProperties.hasOwnProperty(property)) {
        console.warn(`"${property}" is not a valid response property. The valid properties are:

  ${Object.keys(validProperties).join(", ")}`);
      }
    });
  }

  response["meta"] = results["meta"];
  response["body"] = results["body"];
  response["data"] = results["data"];
  if (results["redirect"]) {
    response["redirect"] = createRedirect(results["redirect"], router);
  }

  return response;
}

function createRedirect(
  redirect: RedirectProps | ExternalRedirect,
  router: CuriRouter
): RedirectLocation | ExternalRedirect {
  if (isExternalRedirect(redirect)) {
    return redirect;
  }
  let { name, params, query, hash, state } = redirect;
  let url = router.url({ name, params, query, hash });
  return {
    name,
    params,
    query,
    hash,
    state,
    url
  };
}
