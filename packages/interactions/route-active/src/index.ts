import { Route, Response, Interaction, Params } from "@curi/router";
import { SessionLocation } from "@hickory/root";

function acceptable_route_name(
  name: string,
  response: Response,
  partial?: boolean
): boolean {
  return (
    name === response.name ||
    !!(partial && response.partials.some((n: string) => name === n))
  );
}

export type LocationCheck = (l: SessionLocation) => boolean;

export interface ActiveCheckOptions {
  params?: Params;
  partial?: boolean;
  location_check?: LocationCheck;
}

export default function check_if_active(): Interaction {
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
        !acceptable_route_name(name, response, options.partial)
      ) {
        return false;
      }
      const route_keys_to_check = route_params[name];
      for (let r = 0, length = route_keys_to_check.length; r < length; r++) {
        const key = route_keys_to_check[r];
        const param = options.params[key];
        if (!param || param !== response.params[key]) {
          return false;
        }
      }
      if (options.location_check) {
        return options.location_check(response.location);
      }
      return true;
    },
    reset() {
      route_params = {};
    }
  };
}
