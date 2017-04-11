const ComponentStore = (defaultComponent = null) => {
  const components = {};

  return {
    register: (name, component) => {
      components[name] = component;
    },
    get: (name) => {
      return components[name] ? components[name] : defaultComponent;
    }
  }
}

export default ComponentStore;
