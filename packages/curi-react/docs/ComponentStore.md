# Preloaded Component Store

Code splitting with the `import()` API provided by Webpack allows you to reduce the amount of content needed to download when  your application first loads. `import()` returns a Promise, but React can't render a Promise. What you actually want is the component that is loaded by the import call.

If you are using code splitting with a Curi/React application, what you will want to do is to store references to the exported from component. The most simple solution to this would be to use an object. When the `import()` Promise resolves, you would use the route's name to store the loaded component.

When you are code splitting, you won't have a direct reference to a route's component, so you will need to also use the `call` property of the route instead of `value.

```js
const store = {};
const routes = [
  {
    name: 'Home'
    preload: () => {
      return import('./components/Home').then(module => {
        store['Home'] = module.default;
      });
    },
    call: () => {
      return store['Home'];
    }
  }
];
```

**Note:** The above does not catch import errors. You will need to determine what should happen if the import fails.

## Slightly more complicated store

You may want to have a slightly more intelligent "store" than a simple object provides.

The `ComponentStore` function below creates a store with `set` and `get` methods to get and set components from the store. It also allows you to provide a "default" component that will be returned if the requested component does not exist in the store.

```js
const ComponentStore = (defaultComponent = () => null) => {
  const components = {};

  return {
    set: (name, component) => {
      components[name] = component;
    },
    get: name => {
      return components[name] ? components[name] : defaultComponent;
    }
  };
};

// usage
const store = ComponentStore();
const routes = [
  {
    name: 'Home'
    preload: () => {
      return import('./components/Home').then(module => {
        store.set('Home', module.default);
      });
    },
    call: () => {
      return store.get('Home');
    }
  }
];
```
