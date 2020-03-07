import {
  Route,
  AsyncRoute,
  ExternalRedirect,
  RedirectLocation,
  RedirectProps
} from "@curi/types";

export function isAsyncRoute(route: Route): route is AsyncRoute {
  return typeof route.methods.resolve !== "undefined";
}

export function isExternalRedirect(
  redirect: ExternalRedirect | RedirectLocation | RedirectProps
): redirect is ExternalRedirect {
  return "externalURL" in redirect;
}

export function isRedirectLocation(
  redirect: ExternalRedirect | RedirectLocation | RedirectProps
): redirect is RedirectLocation {
  return "url" in redirect;
}
