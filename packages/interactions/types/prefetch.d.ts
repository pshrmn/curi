import { Route, IntrinsicResponse, ResolveResults } from "@curi/types";
export interface PrefetchCallOptions {
    match?: IntrinsicResponse;
    external?: any;
}
declare let prefetch: (route: Route<unknown>, options?: PrefetchCallOptions) => Promise<ResolveResults>;
export default prefetch;
