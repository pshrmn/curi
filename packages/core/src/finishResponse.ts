import routeProperties from "./utils/routeProperties";

import { InternalRoute, RedirectProps } from "./types/route";
import { Addons } from "./types/addon";
import { Response, PendingResponse } from "./types/response";

function responseSetters(response: Response, addons: Addons) {
  return {
    redirect(redirectProps: RedirectProps): void {
      const { name, params, query, hash, state, status = 301 } = redirectProps;
      response.status = status;
      const pathname = addons.pathname(name, params);
      response.redirectTo = {
        pathname,
        query,
        hash,
        state
      };
    },

    error(err: any): void {
      response.error = err;
    },

    status(code: number): void {
      response.status = code;
    },

    data(data: any): void {
      response.data = data;
    },

    body(body: any): void {
      response.body = body;
    },

    title(title: string): void {
      response.title = title;
    }
  };
}

export default function finishResponse(
  pending: PendingResponse,
  addons: Addons
): Response {
  const { error, resolved, route, response } = pending;
  if (route && route.public.match.response) {
    route.public.match.response({
      error,
      resolved,
      route: routeProperties(response),
      set: responseSetters(response, addons),
      addons
    });
  }
  return response;
}
