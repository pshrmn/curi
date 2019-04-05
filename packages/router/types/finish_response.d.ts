import { History } from "@hickory/root";
import { Interactions, Response, ResolveResults, IntrinsicResponse, ResponseFn } from "@curi/types";
export default function finish_response(create_response: ResponseFn, match: IntrinsicResponse, interactions: Interactions, resolved_results: ResolveResults | null, history: History, external: any): Response;
