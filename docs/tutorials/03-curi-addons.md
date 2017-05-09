# Curi Addons Tutorial

Addons in Curi allow you to interact with a registered route using its `name`. A registered route is generally any route that was passed the configuration object when creating it. However, some addons do not register all routes.

Addons are objects with three properties: `name`, `register`, and `get`.

* `name` is the string you will use to call the addon.
* `register` is used internally, so you only have to think about it if you write your own addon.
* `get` is the function that will be called when you call the addon. The first argument to `get` is always the name of the route. Other arguments to the `get` will vary based on the addon.

## Adding addons

Whenver you include addons in your configuration object, you do not pass the actual addon object. Instead, you pass a function that will return the addon object. This allows addons to be instanced (multiple configuration objects would each have their own instance of the addon), which can be useful for server-side rendering.

Addons are provided to the `createConfig` call as an array using the `addons` property of the `options` object (the third argument to `createConfig`).

```js
const config = createConfig(
  history,
  routes,
  {
    addons: [createMyAddon]
  }
);
```

The addon will be added to the configuration object's `addons` property. To call an addon, you simply use its name.

```js
const myValue = config.addons.myAddon('Some Route', ...);
```

## Creating Addons

You may find yourself wanting to add a custom addon to your application. There are just a few steps that you should follow in order to write your own addon.

1. Remember that you need to export a function that will create the addon object, not the actual addon object.

```js
export default function myAddonFactory() {
  ...
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

That is all there is to creating a basic addon. Now, you just need to make sure to pass it to your configuration object.

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

### Slightly more advanced

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
