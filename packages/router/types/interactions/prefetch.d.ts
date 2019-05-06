import { Route, IntrinsicResponse, ResolveResults } from "@curi/types";
export interface PrefetchCallOptions {
    match?: IntrinsicResponse;
    external?: any;
}
export default function prefetch(route: Route, options?: PrefetchCallOptions): Promise<ResolveResults>;
