import uri from '../uri';

export default function createURIs(routes, addons, parentData) {
  return routes.map(route => {
    // register the route with each addon
    const registerData = {};
    addons.forEach(addon => {
      const { name, register } = addon;
      registerData[name] = register(route, parentData[name]);
    });

    // the children need to be uris
    const children = route.children
      ? createURIs(route.children, addons, registerData)
      : [];

    // finally, create the uri
    return uri({ ...route, children });
  });
}

