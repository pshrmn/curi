# Server rendering

Server rendering with `curi` is fairly straightforward. You should have a catch all route handler that will respond to all (non-static file) requests.

```js
const history = createReusable();

function catchAll(req, res) {
  // 1. Create a router and the root Curi provider component
  const router = createRouter(history, routes, {
    history: {
      location: req.url
    }
  });
  const Router = createRouterComponent(router);

  // 2. Wait for the initial location's response to finish
  router.once(({ response, navigation }) => {
    // 3. Generate the HTML markup by rendering the <Router> and
    // passing it the render function
    const markup = renderToString(
      <Router>
        {renderFunction}
      </Router>
    );
    // 4. Insert the markup into the page's html and send it
    res.send(renderFullPage(markup));
  });
}
```

The above example is very basic. Some other things that you might need to consider are:

* redirects — You should redirect instead of rendering markup when `redirect` is set.

```js
router.once(({ response }) => {
  if (response.redirect) {
    res.redirect(response.redirect);
  }
  // ...
});
```

* Data loading — You would need to maintain two copies of your routes if you want to handle data fetching on the server differently than it works on the client side. This is not something that I have explored very closely yet, so I don't have any recommendations on exactly how to approach this.

* Code splitting — In order to use dynamic `import`s on the server, you will probably need to use a Babel plugin like `dynamic-import-node`. Unfortunately, `dynamic-import-node` breaks Webpack's code splitting. In order for your code to be split into multiple bundles, you should ensure that `dynamic-import-node` isn't being run when building your client side bundle. The solution used in this experiment is to use the `env` property.

```js
{
  "presets": [ "es2015", "react" ],
  "plugins": [
    "syntax-dynamic-import"
  ],
  "env": {
    "server": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

Then, when starting the server, make sure that `BABEL_ENV=server`.

```
cross-env BABEL_ENV=server npm start
```
