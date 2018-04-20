import { HickoryLocation } from "@hickory/root";
import { InternalRoute, BestMatch } from "../types/route";
export default function matchLocation(location: HickoryLocation, routes: Array<InternalRoute>): BestMatch;
