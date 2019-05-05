import {
  Route,
  AsyncRoute,
  ExternalRedirect,
  RedirectLocation,
  RedirectProps
} from "@curi/types";

export function isAsyncRoute(route: Route): route is AsyncRoute {
  return typeof route.resolve !== "undefined";
}

export function isExternalRedirect(
  redirect: ExternalRedirect | RedirectLocation | RedirectProps
): redirect is ExternalRedirect {
  return "externalURL" in redirect;
}
