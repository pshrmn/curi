import { SessionLocation } from "@hickory/root";
import { CompiledRoute } from "./types/route";
import { PossibleMatch } from "./types/match";
export default function matchLocation<Q>(location: SessionLocation<Q>, routes: Array<CompiledRoute>): PossibleMatch<Q>;
