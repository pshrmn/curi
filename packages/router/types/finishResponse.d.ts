import { History } from "@hickory/root";
import { Interactions, Response, ResolveResults, IntrinsicResponse, ResponseFn } from "@curi/types";
export default function finishResponse(createResponse: ResponseFn, match: IntrinsicResponse, interactions: Interactions, resolvedResults: ResolveResults | null, history: History, external: any): Response;
