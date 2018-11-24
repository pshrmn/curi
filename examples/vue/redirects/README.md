# Authentication

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/vue/authentication)

Sometimes you will want to redirect based on the results of your `load` function. For instance, you might see that a user is not authenticated and shouldn't be able to view a page.

When this happens, your `load` function should modify the response by calling its `redirect` method.

```js
const routes = [
  // ...,
  {
    name: 'Protected',
    path: 'super-secret',
    load: (resp) => {
      if (!store.userIsAuthenticated) {
        resp.redirect('/login', 302);
      }
    }
  }
];
```
