import { Match } from "./types/match";
import { ResolveResults } from "./types/route";
export default function resolveRoute<Q>(match: Match<Q>, global: any): Promise<ResolveResults>;
