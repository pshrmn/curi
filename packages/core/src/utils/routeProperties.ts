import { InternalRoute, RouteProps } from "../types/route";
import { Response } from "../types/response";

export default function routeProperties(response: Response): RouteProps {
  return {
    params: response.params,
    location: response.location,
    name: response.name
  };
}
