# Redirecting

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

Then, in your render function (the `<Navigator>`'s `children` prop), you would check the if the response's `redirectTo` property is set. If it is, you could manually redirect using `config.history` or just render a `<Redirect>` and that will be handled for you.

```js
function render(response, config) {
  if (response.redirectTo) {
    return <Redirect to={response.redirectTo} />
  }
  // ...
}
```
