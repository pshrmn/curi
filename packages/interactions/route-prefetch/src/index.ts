import {
  Interaction,
  Route,
  MatchResponseProperties,
  OnFns,
  Resolved
} from "@curi/core";
import { HickoryLocation } from "@hickory/root";

function prefetchRoute(): Interaction {
  let loaders: { [key: string]: OnFns } = {};

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
      if (on && (on.every || on.initial)) {
        loaders[name] = on;
      }
    },
    get: (name: string, props?: MatchResponseProperties): Promise<Resolved> => {
      if (loaders[name] == null) {
        return Promise.resolve({
          error: `Could not prefetch data for ${name} because it is not registered.`,
          initial: null,
          every: null
        });
      }
      const { initial, every } = loaders[name];
      return Promise.all([initial && initial(props), every && every(props)])
        .then(([initial, every]) => ({ initial, every, error: null }))
        .catch(error => ({
          initial: null,
          every: null,
          error
        }));
    },
    reset() {
      loaders = {};
    }
  };
}

export default prefetchRoute;
