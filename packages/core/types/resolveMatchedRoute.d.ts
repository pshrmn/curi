import { Match } from "./types/match";
import { Resolved } from "./types/response";
export default function resolveRoute(match: Match): Promise<Resolved>;
