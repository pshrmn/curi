let loaders = {};

function register(name, fn) {
  loaders[name] = fn;
}

export default prefetch = {
  name: 'prefetch',
  register: (uri) => {
    const { name, load } = uri;
    if (load.load) {
      loaders[name] = load.load;
    }
  },
  reset: () => {
    loaders = {};
  },
  get: (name, ...rest) => {
    if (!loaders[name]) {
      console.error(`Could not preload data for ${name} because it is not registered.`);
      return;
    }
    return loaders[name](rest);
  }
};
