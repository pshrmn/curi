import { PreparedRoute } from "@curi/types";
import { RouteDescriptor } from "./types/route";
declare const create_route: (options: RouteDescriptor, parent_path: string | null, used_names: Set<string>) => PreparedRoute;
export default create_route;
