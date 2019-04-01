import { SessionLocation } from "@hickory/root";
import { PreparedRoute } from "@curi/types";
import { PossibleMatch } from "./types/match";
export default function match_location(location: SessionLocation, routes: Array<PreparedRoute>): PossibleMatch;
