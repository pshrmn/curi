import { Route, AsyncRoute, ExternalRedirect, RedirectLocation, RedirectProps } from "@curi/types";
export declare function isAsyncRoute(route: Route): route is AsyncRoute;
export declare function isExternalRedirect(redirect: ExternalRedirect | RedirectLocation | RedirectProps): redirect is ExternalRedirect;
export declare function isRedirectLocation(redirect: ExternalRedirect | RedirectLocation | RedirectProps): redirect is RedirectLocation;
