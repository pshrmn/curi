## Next

* Fix bug where route with no children and path option `end=false` would match non-exact paths.

## 1.0.0-beta.6

* Switch to TypeScript

## 1.0.0-beta.5

* Update to `path-to-regexp` v2. The changes can be seen [here](https://github.com/pillarjs/path-to-regexp/blob/master/History.md#200--2017-08-23). Most significantly, instead of using `*` as a wildcard, you now need to use `(.*)`.
* Pass the last `action` type as second argument to subscriber function calls. This makes it so that subscribers and side effects both receive the same arguments.

## 1.0.0-beta.4

* Pass the `location` object to `route.load` calls. This allows us to use the `query` and `hash` (or any other location properties) in our load function.

## 1.0.0-beta.3

* Switched to scoped package: `@curi/core`.

## 1.0.0-beta.1

* Getting close to where this should be ready for release, so switching to beta version.

## 0.11.0

* Drop `middleware`, add `sideEffects`. The main reason for middleware was because history doesn't
support query parsing, but now that Curi uses Hickory, it is unnecessary. Most of the remaining use
cases seemed to be side effects, so just making that explicit. If there is a need for modifying the response, then that can be looked at, but for the time being there doesn't appear to be a good reason to add this.

* Only pass a subset of the `ResponseCreator` methods to route `load` functions. These are the only ones that a developer should be using, so only pass these. The other ones could break the response, so don't give access to those.

## 0.10.1

* Add support for `route.title` (either a string or a function).

## 0.10.0

* Switch to the [`hickory`](https://github.com/pshrmn/hickory) package for history.
* Remove `path-to-regexp` from the ES/CommonJS builds.

## 0.9.0

* New build (uses Rollup to output a single file for each build type).

## 0.8.3

* Change `config.ready` function to always return the `Promise` that is generating (or generated) the most recent response.

## 0.8.2

* Updated to `history@4.6.2` (no more automatic `pathname` encoding).

## 0.8.1

* Fixed bug with setting `response.body` too early, which broke async body loading.
* Fixed bug with the cache returning a `ResponseCreator` and not a `response`.

## 0.8.0

* Drop the route's `value`/`call` properties in favor of just one: `body`. This **must** be a function (whose return value will be set as a response's `body` property).

## 0.7.5

* Fixed route matching for routes with children when no child routes match.

## 0.7.3

* The configuration object begins making a response object when its `setup` method is called.
* When a subscriber function subscribes, it is always called immediately. If the initial response object has not resolved, the subscriber function will be passed `undefined`.

## 0.7.1

* Renamed `Response` to `ResponseCreator` (makes it easier to differentiate it from response objects).
* Add `ResponseCreator.setData`, which will set the `data` property on the response object it creates.
