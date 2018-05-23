let cache = {};

export default {
  get(id) {
    return cache[id];
  },
  set(id, value) {
    cache[id] = value;
  },
  reset() {
    cache = {};
  }
};
