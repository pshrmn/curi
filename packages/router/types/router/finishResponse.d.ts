import { History } from "@hickory/root";
import { RouteMatcher, Response, ResolveResults, IntrinsicResponse, Route } from "@curi/types";
export default function finishResponse(route: Route, match: IntrinsicResponse, routes: RouteMatcher, resolvedResults: ResolveResults | null, history: History, external: any): Response;
