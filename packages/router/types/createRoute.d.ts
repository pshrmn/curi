import { RouteDescriptor, CompiledRoute } from "./types/route";
declare const createRoute: (options: RouteDescriptor, usedNames: Set<string>) => CompiledRoute;
export default createRoute;
