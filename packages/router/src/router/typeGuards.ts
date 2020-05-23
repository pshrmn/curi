import {
  Route,
  AsyncRoute,
  ExternalRedirect,
  RedirectLocation,
  RedirectProps
} from "@curi/types";

export let isAsyncRoute = (route: Route): route is AsyncRoute => {
  return typeof route.methods.resolve !== "undefined";
};

export let isExternalRedirect = (
  redirect: ExternalRedirect | RedirectLocation | RedirectProps
): redirect is ExternalRedirect => {
  return "externalURL" in redirect;
};

export let isRedirectLocation = (
  redirect: ExternalRedirect | RedirectLocation | RedirectProps
): redirect is RedirectLocation => {
  return "url" in redirect;
};
