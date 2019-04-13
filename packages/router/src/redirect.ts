import { ExternalRedirect, RedirectLocation, RedirectProps } from "@curi/types";

export function isExternalRedirect(
  redirect: ExternalRedirect | RedirectLocation | RedirectProps
): redirect is ExternalRedirect {
  return "external" in redirect;
}
