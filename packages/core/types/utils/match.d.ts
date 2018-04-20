import { HickoryLocation } from "@hickory/root";
import { InternalRoute, MatchedRoute } from '../types/route';
export default function matchLocation(location: HickoryLocation, routes: Array<InternalRoute>): MatchedRoute;
