import { CuriRouter, Response, ResolveResults, IntrinsicResponse, Route } from "@curi/types";
declare let finishResponse: (route: Route<unknown>, match: IntrinsicResponse, resolvedResults: ResolveResults | null, router: CuriRouter, external: any) => Response;
export default finishResponse;
