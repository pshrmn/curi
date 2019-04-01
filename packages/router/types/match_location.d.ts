import { SessionLocation } from "@hickory/root";
import { CompiledRoute } from "@curi/types";
import { PossibleMatch } from "./types/match";
export default function match_location(location: SessionLocation, routes: Array<CompiledRoute>): PossibleMatch;
