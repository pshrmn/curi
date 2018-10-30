import { Match } from "./types/match";
import { ResolveResults } from "./types/route";

export interface KeyPromiseGroup {
  keys: Array<string>;
  promises: Array<Promise<any>>;
}
/*
 * This will call any initial/every match functions for the matching route
 */
export default function resolveRoute(
  match: Match,
  global: any
): Promise<ResolveResults> {
  const { resolve } = match.route.public;

  const { keys, promises } = Object.keys(resolve).reduce(
    (acc, key) => {
      acc.keys.push(key);
      acc.promises.push(resolve[key](match.match, global));
      return acc;
    },
    { keys: [], promises: [] } as KeyPromiseGroup
  );

  return Promise.all(promises).then(
    results => {
      return {
        resolved: results.reduce((acc, curr, index) => {
          acc[keys[index]] = curr;
          return acc;
        }, {}),
        error: null
      };
    },
    error => ({ error, resolved: null })
  );
}
