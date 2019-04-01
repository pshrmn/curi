import { History } from "@hickory/root";
import { Interactions, Response, ResolveResults } from "@curi/types";
import { RealMatch } from "./match_location";
export default function finish_response(route_match: RealMatch, interactions: Interactions, resolved_results: ResolveResults | null, history: History, external: any): Response;
