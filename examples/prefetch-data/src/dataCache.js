const cache = {};

export default {
  set: (name, data) => {
    cache[name] = data;
  },
  get: name => {
    return cache[name];
  }
};
