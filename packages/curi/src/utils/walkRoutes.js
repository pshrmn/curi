import uri from './createUri';

export default function walkRoutes(routes, addons, parentData) {
  return routes.map(route => {
    const registerData = {};
    addons.forEach(addon => {
      const { name, register } = addon;
      registerData[name] = register(route, parentData[name]);
    });

    const children = route.children
      ? walkRoutes(route.children, addons, registerData)
      : [];

    return uri({ ...route, children });
  });
}
