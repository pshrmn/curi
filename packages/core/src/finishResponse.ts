import routeProperties from './utils/routeProperties';

import { ToArgument } from '@hickory/root';
import { InternalRoute } from './types/route';
import { Addons } from './types/addon';
import { Response, PendingResponse, ResponseProps } from './types/response';

function responseSetters(props: ResponseProps) {
  return {
    redirect(to: ToArgument, code: number = 301): void {
      props.status = code;
      props.redirectTo = to;
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
      set: responseSetters(props),
      addons
    });
  }
  return freezeResponse(route, props);
}
