# Code Splitting

Code splitting with `curi` routes is done using the `preload` property.

The process is slightly more complex than just returning an `import` Promise. This is because we cannot render a Promise. What we actually want is the imported module's `default` export value (or possibly a named export). In order to do this, you should use some sort of storage system to be able to reference that imported value on demand.

For example, `react-curi` provides the `ComponentStore` function. When you create a component store, it provides a simple `register/get` API that will return a default value when you try to get a value that does not exist.

A plain JavaScript object would work just as well, you just would need to handle what happens if you (for some reason) try to access a route that hasn't been stored.

You will also need to use the route's `call` property instead of its `value` property. The `call` function should return the stored value.

```js
import { ComponentStore } from 'curi-react';

const store = ComponentStore();

const routes = [
  // ...,
  {
    name: 'User',
    path: 'user/:id',
    preload: () => {
      return import('./components/User')
        .then(module => {
          store.register('User', module.default);
        })
        .catch(err => {
          // you will need to decide what to do if
          // your import fails
        });
    },
    call: () => {
      return store.get('User');
    }
  },
  // ...
```
