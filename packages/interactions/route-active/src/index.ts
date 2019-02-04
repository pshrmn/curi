import { Route, Response, Interaction, Params } from "@curi/router";
import { HickoryLocation } from "@hickory/root";

function acceptableRouteName(
  name: string,
  response: Response,
  partial?: boolean
): boolean {
  return (
    name === response.name ||
    !!(partial && response.partials.some((n: string) => name === n))
  );
}

export type LocationCheck = (l: HickoryLocation) => boolean;

export interface ActiveCheckOptions {
  params?: Params;
  partial?: boolean;
  locationCheck?: LocationCheck;
}

export default function checkIfActive(): Interaction {
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
      options: ActiveCheckOptions
    ): boolean => {
      if (
        routeParams[name] == null ||
        !acceptableRouteName(name, response, options.partial)
      ) {
        return false;
      }
      const routeKeysToCheck = routeParams[name];
      for (let r = 0, length = routeKeysToCheck.length; r < length; r++) {
        const key = routeKeysToCheck[r];
        const param = options.params[key];
        if (!param || param !== response.params[key]) {
          return false;
        }
      }
      if (options.locationCheck) {
        return options.locationCheck(response.location);
      }
      return true;
    },
    reset() {
      routeParams = {};
    }
  };
}
