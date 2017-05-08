import createRoute from './createRoute';

export default function walkRoutes(routeArray, addons) {
  const routes = createRoutes(routeArray);
  registerAddons(addons, routes);
  return routes;
}

function createRoutes(routeArray) {
  return routeArray.map(routeObject => {
    const children = routeObject.children
      ? createRoutes(routeObject.children)
      : [];

    const route = createRoute({ ...routeObject, children });
    return route;
  });
}

function registerAddons(addons, routes) {
  addons.forEach(addon => {
    registerRoutes(routes, addon);
  });
}

function registerRoutes(routes, addon, parentData) {
  routes.forEach(route => {
    const data = addon.register(route, parentData);
    if (route.children) {
      registerRoutes(route.children, addon, data);
    }
  });
}