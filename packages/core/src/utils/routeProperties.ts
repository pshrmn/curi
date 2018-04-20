import { InternalRoute, RouteProps } from "../types/route";
import { Response } from "../types/response";

export default function routeProperties(base: Response): RouteProps {
  return {
    params: base.params,
    location: base.location,
    name: base.name
  };
}
