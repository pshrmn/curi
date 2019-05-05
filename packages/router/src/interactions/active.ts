import { Route, Response, Params } from "@curi/types";
import { SessionLocation } from "@hickory/root";

export type ValidateComponents = (l: SessionLocation) => boolean;

export interface ActiveCheckOptions {
  params?: Params;
  partial?: boolean;
  components?: ValidateComponents;
}

export default function active(
  route: Route,
  response: Response,
  options: ActiveCheckOptions = {}
): boolean {
  if (
    response.name !== route.meta.name &&
    (!options.partial || !route.meta.descendants.some(n => n === response.name))
  ) {
    return false;
  }
  const keys = route.meta.keys;
  if (keys.length) {
    if (!options.params) {
      return false;
    }
    for (let r = 0, length = keys.length; r < length; r++) {
      const key = keys[r];
      const param = options.params[key];
      if (!param || param !== response.params[key]) {
        return false;
      }
    }
  }
  if (options.components) {
    return options.components(response.location);
  }
  return true;
}
