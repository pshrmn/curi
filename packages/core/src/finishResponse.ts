import routeProperties from "./utils/routeProperties";

import { InternalRoute, RedirectProps } from "./types/route";
import { Addons } from "./types/addon";
import { Response, PendingResponse } from "./types/response";

function responseSetters(base: Response, addons: Addons) {
  return {
    redirect(redirectProps: RedirectProps): void {
      const { name, params, query, hash, state, status = 301 } = redirectProps;
      base.status = status;
      const pathname = addons.pathname(name, params);
      base.redirectTo = {
        pathname,
        query,
        hash,
        state
      };
    },

    error(err: any): void {
      base.error = err;
    },

    status(code: number): void {
      base.status = code;
    },

    data(data: any): void {
      base.data = data;
    },

    body(body: any): void {
      base.body = body;
    },

    title(title: string): void {
      base.title = title;
    }
  };
}

export default function finishResponse(
  pending: PendingResponse,
  addons: Addons
): Response {
  const { error, resolved, route, base } = pending;
  if (route && route.public.match.response) {
    route.public.match.response({
      error,
      resolved,
      route: routeProperties(base),
      set: responseSetters(base, addons),
      addons
    });
  }
  return base;
}
