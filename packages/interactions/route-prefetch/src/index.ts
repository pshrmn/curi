import {
  Interaction,
  Route,
  MatchResponseProperties,
  ResolveResults,
  AsyncGroup
} from "@curi/router";
import { HickoryLocation } from "@hickory/root";

export type WhichFns = Array<string>;

export default function prefetchRoute(): Interaction {
  let loaders: { [key: string]: AsyncGroup } = {};

  return {
    name: "prefetch",
    register: (route: Route) => {
      const { name, resolve } = route;
      if (loaders[name] !== undefined) {
        console.warn(
          '[@curi/route-prefetch] A route with the name "' +
            name +
            '" already exists. Each route should' +
            "have a unique name. By registering a function with a name that already exists, " +
            "you are overwriting the existing one. This may break your application."
        );
      }
      if (resolve && Object.keys(resolve).length) {
        loaders[name] = resolve;
      }
    },
    get: (
      name: string,
      props?: MatchResponseProperties,
      which?: WhichFns
    ): Promise<ResolveResults> => {
      if (loaders[name] == null) {
        return Promise.resolve({
          error: `Could not prefetch data for ${name} because it is not registered.`,
          resolved: null
        });
      }
      const asyncFns = loaders[name];
      const { keys, promises } = Object.keys(asyncFns).reduce(
        (acc, key) => {
          if (which && which.indexOf(key) === -1) {
            return acc;
          }
          acc.keys.push(key);
          acc.promises.push(asyncFns[key](props));
          return acc;
        },
        { keys: [], promises: [] }
      );

      return Promise.all(promises)
        .then(results => ({
          resolved: results.reduce((acc, curr, index) => {
            acc[keys[index]] = curr;
            return acc;
          }, {}),
          error: null
        }))
        .catch(error => ({
          resolved: null,
          error
        }));
    },
    reset() {
      loaders = {};
    }
  };
}
