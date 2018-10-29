import { Match } from "./types/match";
import { ResolveResults } from "./types/route";
export interface KeyPromiseGroup {
    keys: Array<string>;
    promises: Array<Promise<any>>;
}
export default function resolveRoute(match: Match, global: any): Promise<ResolveResults>;
