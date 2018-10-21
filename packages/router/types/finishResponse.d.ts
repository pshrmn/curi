import { History } from "@hickory/root";
import { Interactions } from "./types/interaction";
import { Response } from "./types/response";
import { ResolveResults } from "./types/route";
import { Match } from "./types/match";
export default function finishResponse(routeMatch: Match, interactions: Interactions, resolvedResults: ResolveResults | null, history: History): Response;
