import { RouteDescriptor, InternalRoute } from "../types/route";

function hasMatchFunction(route: InternalRoute): boolean {
  const { async } = route.public;
  return !!(async && (async.every || async.initial));
}

export default function hasAsyncRoute(routes: Array<InternalRoute>): boolean {
  return routes.some(route => {
    if (hasMatchFunction(route)) {
      return true;
    }
    if (route.children.length) {
      return hasAsyncRoute(route.children);
    }
    return false;
  });
}
