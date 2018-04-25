import { Interaction, Route, MatchResponseProperties } from "@curi/core";
import { HickoryLocation } from "@hickory/root";

function prefetchRoute(): Interaction {
  let loaders: { [key: string]: Function } = {};

  return {
    name: "prefetch",
    register: (route: Route) => {
      const { name, on } = route;
      if (loaders[name] !== undefined) {
        console.warn(
          'A route with the name "' +
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
    get: (name: string, props?: MatchResponseProperties) => {
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

export default prefetchRoute;
