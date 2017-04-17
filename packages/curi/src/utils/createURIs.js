import uri from '../uri';

export default function createURIs(routes, addons, parentData) {
  return routes.map(route => {
    const registerData = {};
    addons.forEach(addon => {
      const { name, register } = addon;
      registerData[name] = register(route, parentData[name]);
    });

    const children = route.children
      ? createURIs(route.children, addons, registerData)
      : [];

    return uri({ ...route, children });
  });
}

