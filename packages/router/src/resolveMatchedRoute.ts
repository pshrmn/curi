import { Match } from "./types/match";
import { ResolveResults, AsyncRoute } from "./types/route";

export default function resolveRoute<Q>(
  match: Match<Q>,
  global: any
): Promise<ResolveResults> {
  const { resolve } = <AsyncRoute>match.route.public;
  if (!resolve) {
    return Promise.resolve({ resolved: null, error: "No resolve function" });
  }

  return resolve(match.match, global).then(
    resolved => ({ resolved, error: null }),
    error => ({ error, resolved: null })
  );
}
