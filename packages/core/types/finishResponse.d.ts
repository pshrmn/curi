import { Interactions } from "./types/interaction";
import { Response, Resolved } from "./types/response";
import { BestMatch } from "./types/match";
export default function finishResponse<B>(match: BestMatch, interactions: Interactions, resolved: Resolved | null): Response<B>;
