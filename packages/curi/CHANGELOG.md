## 0.8.0

Drop the route's `value`/`call` properties in favor of just one: `body`. This **must** be a function (whose return value will be set as a response's `body` property).

## 0.7.5

* Fixed route matching for routes with children when no child routes match.

## 0.7.3

* The configuration object begins making a response object when its `setup` method is called.
* When a subscriber function subscribes, it is always called immediately. If the initial response object has not resolved, the subscriber function will be passed `undefined`.
