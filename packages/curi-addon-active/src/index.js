function acceptableRouteName(name, response, partial) {
  if (name === response.name) {
    return true;
  } else if (partial && response.partials.some(n => name === n)) {
    return true;
  } else {
    return false;
  }
}

function createActiveAddon() {
  const routeParams = {};

	return {
    name: 'active',
    register: (route, parentKeys) => {
      let { name, keys } = route;
      if (keys == null) {
        keys = [];
      }
      const fullKeys = Array.isArray(parentKeys)? [...parentKeys, ...keys] : keys;
      if (routeParams[name] !== undefined) {
        console.warn(
          'A route function with the name "' +
            name +
            '" already exists. Each route should' +
            'have a unique name. By registering a route function with a name that already exists, ' +
            'you are overwriting the existing one. This may break your application.'
        );
      }
      routeParams[name] = fullKeys;
      return fullKeys;
    },
    get: (name, response, params, partial) => {
      if (routeParams[name] == null) {
        return false;
      }
      if (!acceptableRouteName(name, response, partial)) {
        return false;
      }
      const routeKeysToCheck = routeParams[name];
      for (let r=0, length=routeKeysToCheck.length; r<length; r++) {
        const key = routeKeysToCheck[r];
        const param = params[key];
        if (!param || param !== response.params[key]) {
          return false;
        }
      }
      return true;
    }
  };
}

export default createActiveAddon;
