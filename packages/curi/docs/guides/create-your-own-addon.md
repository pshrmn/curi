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
