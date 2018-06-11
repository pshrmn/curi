import { Match } from "./types/match";
import { Resolved } from "./types/response";

/*
 * This will call any initial/every match functions for the matching route
 */
export default function resolveRoute(match: Match): Promise<Resolved> {
  const { on } = match.route.public;
  return Promise.all([
    on.initial && on.initial(match.match),
    on.every && on.every(match.match)
  ]).then(
    ([initial, every]) => ({ error: null, initial, every }),
    error => ({ error, initial: null, every: null })
  );
}
