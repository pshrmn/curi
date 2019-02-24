import { History } from "@hickory/root";
import { Interactions } from "./types/interaction";
import { Response } from "./types/response";
import { ResolveResults } from "./types/route";
import { Match } from "./types/match";
export default function finishResponse<Q>(routeMatch: Match<Q>, interactions: Interactions, resolvedResults: ResolveResults | null, history: History<Q>, external: any): Response<Q>;
