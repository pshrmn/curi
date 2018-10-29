import { RouteDescriptor, CompiledRoute } from "./types/route";
declare const createRoute: (options: RouteDescriptor, parentPath: string | null, usedNames: Set<string>) => CompiledRoute;
export default createRoute;
