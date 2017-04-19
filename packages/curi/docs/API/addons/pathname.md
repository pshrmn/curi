# pathname addon

The `pathname` addon allows you to generate location pathnames for `uri`s simply by knowing the `uri`'s name. This even works with nested `uri`s by joining their path with their ancestors' paths.

The `pathname` addon is included by default, but if you provide other addons, you will also need to manually include the addon.

```js
// default
import createConfig from 'curi/createConfig';

const history = ...;
const uris = [...];
const config = createConfig(history, uris);

// with other addons
import { prefetch, pathname } from 'curi/addons';
import createConfig from 'curi/createConfig';

const history = ...;
const uris = [...];
const config = createConfig(history, uris, [ pathname, prefetch ]);
```

`path-to-regexp` is used to [compile](https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp) the concatenated `uri` paths so that any params can be properly inserted into the generated pathname.


```js
const uris = [
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

const config = createConfig(history, uris);
const pathname = config.addons.pathname('State', { country: 'Mexico', State, 'Chihuahua' })
// pathname === '/Mexico/Chihuahua'
```

It is important that params have unique names in their hierarchy tree so that when generating pathnames it is obvious where each param should go.

```js
// don't do this!
const uris = [
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
const config = createConfig(history, uris);
const pathname = config.addons.pathname('City', { id: 'Paris' })
// pathname === '/Paris/Paris/Paris'
```
