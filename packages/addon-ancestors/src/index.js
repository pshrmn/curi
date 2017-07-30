function isPositiveInteger(value) {
  return value === parseInt(value, 10) && value > 0;
}

function createAncestorsAddon() {
  const routeAncestors = {};

  return {
    name: 'ancestors',
    register: (route, parentRoutes = []) => {
      let { name } = route;
      if (routeAncestors[name] !== undefined) {
        console.warn(
          'A route with the name "' +
            name +
            '" already exists. Each route should' +
            'have a unique name. By registering a route with a name that already exists, ' +
            'you are overwriting the existing one. This may break your application.'
        );
      }
      routeAncestors[name] = parentRoutes;
      return [name, ...parentRoutes];
    },
    get: (name, level) => {
      const ancestors = routeAncestors[name];
      if (level == null) {
        return ancestors.slice();
      }
      if (!isPositiveInteger(level) || !ancestors[level-1]) {
        return;
      }
      return ancestors[level - 1];
    }
  };
}

export default createAncestorsAddon;
