# `createConfig`

```js
import { createConfig } from 'uric';
```

A configuration object is created using `createConfig`. It takes two arguments: a `history` instance and an array of routes. The routes will be converted into internal `uri` objects.

The returned object provides a `subscription` method that you use to be informed of navigation. Whenever the location changes, the configuration object will use the new location to create a `Response` object. The configuration will walk through its `uri`s (created using the provided routes) to determine which (if any) match and record this information with the `Response`. Once the matching has been completed, configuration object will call all of its subscribed functions, passing them the `Response` object.

If you have any `load` functions, the configuration object will not call the subscribed functions until they have all resolved.

```js
const history = createBrowserHistory();
const conf = createConfig(history, uris);

conf.subscribe((response) => {
  // render the application based on the response
});
```
