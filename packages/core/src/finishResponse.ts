import routeProperties from "./utils/routeProperties";

import { InternalRoute, RedirectProps } from "./types/route";
import { Addons } from "./types/addon";
import { Response, PendingResponse, ResponseProps } from "./types/response";

function responseSetters(props: ResponseProps, addons: Addons) {
  return {
    redirect(redProps: RedirectProps): void {
      const { name, params, query, hash, state, status = 301 } = redProps;
      props.status = status;
      const pathname = addons.pathname(name, params);
      props.redirectTo = {
        pathname,
        query,
        hash,
        state
      };
    },

    error(err: any): void {
      props.error = err;
    },

    status(code: number): void {
      props.status = code;
    },

    data(data: any): void {
      props.data = data;
    },

    body(body: any): void {
      props.body = body;
    },

    title(title: string): void {
      props.title = title;
    }
  };
}

function freezeResponse(route: InternalRoute, props: ResponseProps): Response {
  const response: Response = Object.assign(
    {
      key: props.location.key,
      name: route ? route.public.name : undefined
    },
    props
  );

  return response;
}

export default function finishResponse(
  pending: PendingResponse,
  addons: Addons
): Response {
  const { error, resolved, route, props } = pending;
  if (route && route.public.match.response) {
    route.public.match.response({
      error,
      resolved,
      route: routeProperties(route, props),
      set: responseSetters(props, addons),
      addons
    });
  }
  return freezeResponse(route, props);
}
