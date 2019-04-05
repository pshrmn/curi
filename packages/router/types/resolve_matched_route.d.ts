import { Route, ResolveResults, AsyncRoute, IntrinsicResponse } from "@curi/types";
export declare function resolve_route(route: AsyncRoute, match: IntrinsicResponse, global: any): Promise<ResolveResults>;
export declare function is_async_route(route: Route): route is AsyncRoute;
