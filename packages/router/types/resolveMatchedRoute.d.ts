import { Route, ResolveResults, AsyncRoute, IntrinsicResponse } from "@curi/types";
export declare function resolveRoute(route: AsyncRoute, match: IntrinsicResponse, global: any): Promise<ResolveResults>;
export declare function isAsyncRoute(route: Route): route is AsyncRoute;
