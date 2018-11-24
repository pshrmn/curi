# Authentication

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/react/authentication)

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

Curi will automatically generate a new response based on the location that you redirect to. The redirect response _will_ be emitted, so you will have to decide whether to attach a special `body` component to redirect responses or how to "render" the redirect (e.g. show a "redirecting..." string when `response.redirectTo` is defined).
