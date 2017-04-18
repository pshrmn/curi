const dataStore = {};

export default {
  set: (name, data) => {
    dataStore[name] = data;
  },
  get: name => {
    return dataStore[name];
  }
};
