import { MatchResponse, PendingResponse, Params } from "./types/response";
import { BestMatch } from "./types/match";
import { Resolved } from "./types/response";

/*
 * This will call any initial/every match functions for the matching route
 */
export default function resolveRoute(match: BestMatch): Promise<Resolved> {
  const response = match.response;
  const { on } = match.route.public;
  return Promise.all([
    on.initial && on.initial(),
    on.every &&
      on.every({
        name: response.name,
        params: { ...response.params },
        location: response.location
      })
  ]).then(
    ([initial, every]) => ({ error: null, initial, every }),
    error => ({ error, initial: null, every: null })
  );
}
