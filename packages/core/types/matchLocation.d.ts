import { HickoryLocation } from "@hickory/root";
import { InternalRoute } from "./types/route";
import { PossibleMatch } from "./types/match";
export default function matchLocation(location: HickoryLocation, routes: Array<InternalRoute>): PossibleMatch;
