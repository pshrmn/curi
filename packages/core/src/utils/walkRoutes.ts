import createRoute from '../route';
import { RouteDescriptor, Route, RouteMidCreation } from '../route';
import { Addon } from '../interface';

export default function walkRoutes(
  routeArray: Array<RouteDescriptor>,
  addons: Array<Addon>
): Array<Route> {
  const routes: Array<Route> = createRoutes(routeArray);
  registerAddons(addons, routes);
  return routes;
}

function createRoutes(routeArray: Array<RouteDescriptor>): Array<Route> {
  return routeArray.map(routeObject => {
    const children = routeObject.children
      ? createRoutes(routeObject.children)
      : [];

    return createRoute({ ...routeObject, children } as RouteMidCreation);
  });
}

function registerAddons(addons: Array<Addon>, routes: Array<Route>): void {
  addons.forEach(addon => {
    registerRoutes(routes, addon);
  });
}

function registerRoutes(routes: Array<Route>, addon: Addon, parentData?: any) {
  routes.forEach(route => {
    const data = addon.register(route, parentData);
    if (route.children) {
      registerRoutes(route.children, addon, data);
    }
  });
}
