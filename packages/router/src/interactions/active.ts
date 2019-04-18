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
  let scoped: { [key: string]: Array<string | number> } = {};

  return {
    name: "active",
    register: (
      route: Route,
      parentKeys: Array<string | number>
    ): Array<string | number> => {
      let { name, keys } = route;
      const fullKeys = Array.isArray(parentKeys)
        ? [...parentKeys, ...keys]
        : keys;
      scoped[name] = fullKeys;
      return fullKeys;
    },
    get: (
      name: string,
      response: Response,
      options: ActiveCheckOptions = {}
    ): boolean => {
      if (scoped[name] == null || !possible(name, response, options.partial)) {
        return false;
      }
      const keys = scoped[name];
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
  };
}
