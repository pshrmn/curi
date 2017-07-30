# pathname addon

The `pathname` addon allows you to generate location pathnames for routes simply by knowing the route's name. This even works with nested routes by joining their path with their ancestors' paths.

The `pathname` addon is **always** included in the config's addons.

```js
// default
import createConfig from 'curi/createConfig';

const history = ...;
const routes = [...];
const config = createConfig(history, routes);

// with other addons
import { prefetch, pathname } from 'curi/addons';
import createConfig from 'curi/createConfig';

const history = ...;
const routes = [...];
const config = createConfig(history, routes, { addons: [pathname, prefetch] });
```

`path-to-regexp` is used to [compile](https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp) the concatenated route paths so that any params can be properly inserted into the generated pathname.


```js
const routes = [
  {
    name: 'Country',
    path: ':country',
    children: [
      {
        name: 'State',
        path: ':state',
        children: [
          {
            name: 'City',
            path: ':city'
          }
        ]
      }
    ]
  }
];

const config = createConfig(history, routes);
const pathname = config.addons.pathname('State', { country: 'Mexico', State, 'Chihuahua' })
// pathname === '/Mexico/Chihuahua'
```

It is important that params have unique names in their hierarchy tree so that when generating pathnames it is obvious where each param should go.

```js
// don't do this!
const routes = [
  {
    name: 'Country',
    path: ':id',
    children: [
      {
        name: 'State',
        path: ':id',
        children: [
          {
            name: 'City',
            path: ':id'
          }
        ]
      }
    ]
  }
];
const config = createConfig(history, routes);
const pathname = config.addons.pathname('City', { id: 'Paris' })
// pathname === '/Paris/Paris/Paris'
```
