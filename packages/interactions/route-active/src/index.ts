import { Route, Response, Interaction, Params } from "@curi/types";
import { SessionLocation } from "@hickory/root";

function possible_name(
  name: string,
  response: Response,
  partial?: boolean
): boolean {
  return (
    name === response.name ||
    !!(partial && response.partials.some((n: string) => name === n))
  );
}

export type ValidateComponents = (l: SessionLocation) => boolean;

export interface ActiveCheckOptions {
  params?: Params;
  partial?: boolean;
  components?: ValidateComponents;
}

export default function active(): Interaction {
  let route_params: { [key: string]: Array<string> } = {};

  return {
    name: "active",
    register: (route: Route, parent_keys: object): object => {
      let { name, keys } = route;
      if (keys == null) {
        keys = [];
      }
      const full_keys = Array.isArray(parent_keys)
        ? [...parent_keys, ...keys]
        : keys;
      route_params[name] = full_keys;
      return full_keys;
    },
    get: (
      name: string,
      response: Response,
      options: ActiveCheckOptions = {}
    ): boolean => {
      if (
        route_params[name] == null ||
        !possible_name(name, response, options.partial)
      ) {
        return false;
      }
      const keys = route_params[name];
      for (let r = 0, length = keys.length; r < length; r++) {
        const key = keys[r];
        const param = options.params[key];
        if (!param || param !== response.params[key]) {
          return false;
        }
      }
      if (options.components) {
        return options.components(response.location);
      }
      return true;
    }
  };
}
