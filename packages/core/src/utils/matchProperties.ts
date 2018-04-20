import { InternalRoute, MatchedRouteProps } from "../types/route";
import { Response } from "../types/response";

export default function matchProperties(response: Response): MatchedRouteProps {
  return {
    params: response.params,
    location: response.location,
    name: response.name
  };
}
