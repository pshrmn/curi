# `ComponentStore`

The `ComponentStore` isn't actually React specific. When you call `ComponentStore`, you create a simple storage API. 

Essentially, the API allows you to store and retrieve named values. This can be useful if you are using the `preload` property of `curi` routes. You can asynchronously load a component module in `preload` and store if, then in the route's `call` property, you return the stored component from the store.

```js
import { ComponentStore } from 'curi-react';
const store = ComponentStore();

const routes = [
  {
    name: 'Home',
    path: '',
    preload: () => {
      return import('./components/Home').then(module => { store.register('Home', module.default); });
    },
    call: () => {
      return store.get('Home');
    }
  }
];
```

The `ComponentStore` takes one argument, which is the default value to return when no item with the provided name exists in the store. The default value for this is a component that renders `null` (`() => null`).
