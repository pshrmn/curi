# uri-conf

`uri-conf` is a simple route configuration package for creating single page apps. Navigation is powered by [`history`](https://github.com/ReactTraining/history).

```js
import { URIConf, uri, path } from 'uri-conf';
import { createBrowserHistory } from 'history';
```

A `uri` describes each route within the application. Each `uri` has a **unique** `name` string, a `path`, an optional array of nested children `uri`s, and a optional object with loading functions (powered by promises).

```js
const uris = [
  uri('Home', path('', { end: true })),
  uri('About', path('about')),
  uri('FAQ', path('faq'), [ uri('SpecFAQ', path(':question')) ])
];
```

The `path` function uses [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) to parse the string (using the provided options) and return a regular expression that can be used for matching locations.

A `URIConf` is created using a `history` instance and an array of `uri`s. The `URIConf` provides a `subscription` method that you use to be informed of navigation. Whenever the location changes, the `URIConf` will use the new location to create a `Response` object. The `URIConf` will walk through your `uri`s to determine which (if any) match and record this information with the `Response`. Once the matching has been completed, `URIConf` will call all of its subscribed functions, passing them the `Response` object.

If you have any `load` functions, the `URIConf` will not call the subscribed functions until they have all resolved.

```js
const history = createBrowserHistory();
const conf = URIConf(history, uris);

conf.subscribe((response) => {
  // render the application based on the response
});
```
