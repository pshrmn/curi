import { RouteDescriptor, CompiledRoute } from "./types/route";
declare const create_route: (options: RouteDescriptor, parent_path: string | null, used_names: Set<string>) => CompiledRoute;
export default create_route;
