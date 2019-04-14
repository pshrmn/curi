import { History } from "@hickory/root";
import { RouteMatcher, Response, ResolveResults, IntrinsicResponse, ResponseFn } from "@curi/types";
export default function finishResponse(createResponse: ResponseFn, match: IntrinsicResponse, routes: RouteMatcher, resolvedResults: ResolveResults | null, history: History, external: any): Response;
