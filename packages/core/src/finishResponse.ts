import matchProperties from "./utils/matchProperties";

import { InternalRoute, RedirectProps } from "./types/route";
import { Interactions } from "./types/interaction";
import { Response, PendingResponse } from "./types/response";

function responseSetters(response: Response, interactions: Interactions) {
  return {
    redirect(redirectProps: RedirectProps): void {
      const { name, params, query, hash, state, status = 301 } = redirectProps;
      response.status = status;
      const pathname = interactions.pathname(name, params);
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
  interactions: Interactions
): Response {
  const { resolved, route, response } = pending;
  if (route && route.response) {
    route.response({
      set: responseSetters(response, interactions),
      resolved,
      ...matchProperties(response),
      route: interactions
    });
  }
  return response;
}
