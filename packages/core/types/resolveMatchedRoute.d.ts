import { BestMatch } from "./types/match";
import { Resolved } from "./types/response";
export default function resolveRoute(match: BestMatch): Promise<Resolved>;
