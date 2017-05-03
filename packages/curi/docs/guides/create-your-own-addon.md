# Create your own addon

Writing your own Curi addon is quite simple, you just need to follow a few steps:

1. You export a function that will create the addon object, not the actual addon object.

```js
export default function myAddonFactory() {
  
}
```

2. The function should return an object with three properties: `name`, `register`, and `get`. `name` is a unique identifier for the addon, `register` is a function that will be used for your addon to store information about each route, and `get` is a function that will receive a route's name and perform some task using the related route.

```js
export default function myAddonFactory() {
  const knownRoutes = {};
  return {
    name: 'MyFirstAddon',
    register: route => {
      knownRoutes[route.name] = true;
    },
    get: (name) => {
      return knownRoutes[name] != null
    }
  };
}
```

That is all there is to creating an addon. Now, you just need to make sure to pass it to your configuration object.

```js
import createConfig from 'curi';
import myAddonFactory from './myAddon'

const routes = [{ name: 'Home', path: '' }];

const config = createConfig(history, routes, {
  addons: [myAddonFactory]
});
```

Then, you will use the addon's `name` to get information about a route using the route's `name`.

```js
config.addons.MyFirstAddon('Home'); // true
config.addons.MyFirstAddon('Elsewhere'); // false
```

## Slightly more advanced

You might want to write an addon that uses data from parent routes when register a route. For example, the built-in `pathname` addon joins a route's `path` with it parent path(s).

If you want to provide similar functionality, all you have to do is have the `register` function return the desired data. Then, when any children of that route are registered, they will be passed the return value from their parent as the second argument of the register function.

```js
function ParentFactory() {
  const routeTree = {};
  return {
    name: 'routeParent',
    register: (route, parent) => {
      // parent is the value returned by the route's parent route
      // and will be undefined when a route does not have a parent
      routeTree[route.name] = parent;
      return route.name;
    },
    get: (name) => {
      return routeTree[name];
    }
  }
}
```
