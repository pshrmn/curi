import { Route, Response, Interaction, Params } from "@curi/types";
import { SessionLocation } from "@hickory/root";

function possible(
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
  let routeParams: { [key: string]: Array<string> } = {};

  return {
    name: "active",
    register: (route: Route, parentKeys: object): object => {
      let { name, keys } = route;
      if (keys == null) {
        keys = [];
      }
      const fullKeys = Array.isArray(parentKeys)
        ? [...parentKeys, ...keys]
        : keys;
      routeParams[name] = fullKeys;
      return fullKeys;
    },
    get: (
      name: string,
      response: Response,
      options: ActiveCheckOptions = {}
    ): boolean => {
      if (
        routeParams[name] == null ||
        !possible(name, response, options.partial)
      ) {
        return false;
      }
      const keys = routeParams[name];
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
