# `createConfig`

```js
import { createConfig } from 'curi';
```

A configuration object is created using `createConfig`. It takes two arguments: a `history` instance and an array of [route objects]('./route.md).

For any given location object, the configuration object will walk over the array of routes to determine which route (based on the route's `path` property) matches best. The name of the best matched route will be one of the properties of the [`Response`](./response.md) that is built for the location.

## methods

### `subscribe(fn)`

The returned object provides a `subscribe` method that allows your application to be informed of navigation. It expects to be passed a function, which will be called whenever a new response is generated.

If the best-matched route has either a `preload` and/or `load` loading function, the configuration object will not call the subscribed functions until the loading functions have all resolved.

```js
const history = createBrowserHistory();
const conf = createConfig(history, uris);

conf.subscribe((response) => {
  // render the application based on the response
});
```

### `ready()`

When you create a new configuration object, an initial response will be created for the current location (`history.location`). One thing to note, though, is that route matching is an asynchronous process. This allows for behavior like code splitting for bundles and ensuring that data is loaded prior to rendering. However, this means that we can not rely on the response being fully prepared right after the configuration object is created.

The `ready` method returns a `Promise` that will not resolve until the response has been fully prepared. The returned `Promise` will resolve with the prepared response (unless there was an error occurred in preparing the response, which you will need to catch yourself).

If a response has already been generated before `ready` is called, then `ready` will resolve with that response.

```js
conf.ready().then(resp => {
  // now we know that the response is ready
});
```


### `refresh(newRoutes)`

`refresh` allows you to update your configuration object to use a new set of routes.

### `addons`

You can access all of the configuration object's addons through the `addons` property. This allows you to call an addon's `get` method.

For example, if your configuration object uses the `pathname` addon, you can do the following:

```js
const config = createConfig(history, [{ name: 'User', path: 'user/:id' }], [ pathname ]);
const userPathname = config.addons.pathname('User', { id: '12345' });
// userPathname = '/user/12345'
```

### `history`

You can access the `history` object that you passed to `createConfig` through the configuration object's `history` property. This allows you to just pass the configuration object throughout your project instead of both that and the `history` object.
