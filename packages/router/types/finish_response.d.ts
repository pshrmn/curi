import { History } from "@hickory/root";
import { Interactions, Response } from "@curi/types";
import { ResolveResults } from "./types/route";
import { Match } from "./types/match";
export default function finish_response(route_match: Match, interactions: Interactions, resolved_results: ResolveResults | null, history: History, external: any): Response;
