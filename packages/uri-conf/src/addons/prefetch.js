let loaders = {};

const prefetch = {
  name: 'prefetch',
  register: (uri) => {
    const { name, load } = uri;
    if (loaders[name] !== undefined) {
      console.warn(
        'A load function with the name "' + name + '" already exists. Each uri should' +
        'have a unique name. By registering a load function with a name that already exists, ' +
        'you are overwriting the existing one. This may break your application.'
      );
    }
    if (load.load) {
      loaders[name] = load.load;
    }
  },
  reset: () => {
    loaders = {};
  },
  get: (name, ...rest) => {
    if (loaders[name] == null) {
      console.error(`Could not preload data for ${name} because it is not registered.`);
      return;
    }
    return loaders[name].apply(null, rest);
  }
};

export default prefetch;
