import { InternalRoute, RouteProps } from '../types/route';
import { ResponseProps } from '../types/response';

export default function routeProperties(
  route: InternalRoute,
  props: ResponseProps
): RouteProps {
  return {
    params: props.params,
    location: props.location,
    name: route.public.name
  };
}
