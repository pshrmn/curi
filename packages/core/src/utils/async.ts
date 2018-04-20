import { RouteDescriptor, InternalRoute } from "../types/route";

function hasAsyncOnFunction(route: InternalRoute): boolean {
  const { on } = route.public;
  return !!(on && (on.every || on.initial));
}

export default function hasAsyncRoute(routes: Array<InternalRoute>): boolean {
  return routes.some(route => {
    if (hasAsyncOnFunction(route)) {
      return true;
    }
    if (route.children.length) {
      return hasAsyncRoute(route.children);
    }
    return false;
  });
}
