import { HickoryLocation } from "@hickory/root";
import { CompiledRoute } from "./types/route";
import { PossibleMatch } from "./types/match";
export default function matchLocation(location: HickoryLocation, routes: Array<CompiledRoute>): PossibleMatch;
