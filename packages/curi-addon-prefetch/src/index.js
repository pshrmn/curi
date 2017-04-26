function createPrefetchAddon() {
  let loaders = {};

  return {
    name: 'prefetch',
    register: route => {
      const { name, load } = route;
      if (loaders[name] !== undefined) {
        console.warn(
          'A load function with the name "' +
            name +
            '" already exists. Each route should' +
            'have a unique name. By registering a load function with a name that already exists, ' +
            'you are overwriting the existing one. This may break your application.'
        );
      }
      if (load) {
        loaders[name] = load;
      }
    },
    get: (name, ...rest) => {
      if (loaders[name] == null) {
        return Promise.reject(
          `Could not preload data for ${name} because it is not registered.`
        );
      }
      return loaders[name].apply(null, rest);
    }
  };
}

export default createPrefetchAddon;
