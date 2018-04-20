import { Route, Response, Interaction } from "@curi/core";

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

function checkIfActive(): Interaction {
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
      if (routeParams[name] !== undefined) {
        console.warn(
          'A route with the name "' +
            name +
            '" already exists. Each route should' +
            "have a unique name. By registering a route function with a name that already exists, " +
            "you are overwriting the existing one. This may break your application."
        );
      }
      routeParams[name] = fullKeys;
      return fullKeys;
    },
    get: (
      name: string,
      response: Response,
      params: { [key: string]: string },
      partial: boolean
    ): boolean => {
      if (
        routeParams[name] == null ||
        !acceptableRouteName(name, response, partial)
      ) {
        return false;
      }
      const routeKeysToCheck = routeParams[name];
      for (let r = 0, length = routeKeysToCheck.length; r < length; r++) {
        const key = routeKeysToCheck[r];
        const param = params[key];
        if (!param || param !== response.params[key]) {
          return false;
        }
      }
      return true;
    },
    reset() {
      routeParams = {};
    }
  };
}

export default checkIfActive;
