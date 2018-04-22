import { HickoryLocation } from "@hickory/root";
import { InternalRoute } from "../types/route";
import { Match } from "../types/match";
export default function matchLocation(location: HickoryLocation, routes: Array<InternalRoute>): Match;
