import {
  Interaction,
  Route,
  MatchResponseProperties,
  OnFns,
  Resolved
} from "@curi/router";
import { HickoryLocation } from "@hickory/root";

export interface PrefetchType {
  initial?: boolean;
  every?: boolean;
}

export default function prefetchRoute(): Interaction {
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
    get: (
      name: string,
      props?: MatchResponseProperties,
      which?: PrefetchType
    ): Promise<Resolved> => {
      if (loaders[name] == null) {
        return Promise.resolve({
          error: `Could not prefetch data for ${name} because it is not registered.`,
          initial: null,
          every: null
        });
      }
      const { initial, every } = loaders[name];
      let prefetchInitial = true;
      let prefetchEvery = true;
      if (which) {
        prefetchInitial = !!which.initial;
        prefetchEvery = !!which.every;
      }
      return Promise.all([
        initial && prefetchInitial && initial(props),
        every && prefetchEvery && every(props)
      ])
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
