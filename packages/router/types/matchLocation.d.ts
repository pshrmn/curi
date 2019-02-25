import { SessionLocation } from "@hickory/root";
import { CompiledRoute } from "./types/route";
import { PossibleMatch } from "./types/match";
export default function matchLocation(location: SessionLocation, routes: Array<CompiledRoute>): PossibleMatch;
