import { Route, ExternalRedirect, RedirectLocation, RedirectProps } from "@curi/types";
export declare let isAsyncRoute: (route: Route<unknown>) => route is Route<import("@curi/types").Resolver>;
export declare let isExternalRedirect: (redirect: ExternalRedirect | RedirectLocation | RedirectProps) => redirect is ExternalRedirect;
export declare let isRedirectLocation: (redirect: ExternalRedirect | RedirectLocation | RedirectProps) => redirect is RedirectLocation;
