import { Addon, Route, RouteProps } from "@curi/core";
import { HickoryLocation } from "@hickory/root";

function createPrefetchAddon(): Addon {
  let loaders: { [key: string]: Function } = {};

  return {
    name: "prefetch",
    register: (route: Route) => {
      const { name, on } = route;
      if (loaders[name] !== undefined) {
        console.warn(
          'A load function with the name "' +
            name +
            '" already exists. Each route should' +
            "have a unique name. By registering a function with a name that already exists, " +
            "you are overwriting the existing one. This may break your application."
        );
      }
      if (on && on.every) {
        loaders[name] = on.every;
      }
    },
    get: (name: string, props?: RouteProps) => {
      if (loaders[name] == null) {
        return Promise.reject(
          `Could not prefetch data for ${name} because it is not registered.`
        );
      }
      return loaders[name].call(null, props);
    },
    reset() {
      loaders = {};
    }
  };
}

export default createPrefetchAddon;
