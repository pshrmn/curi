## 1.0.0-beta.0

* Remove `responseReducer` and group everything in store under `curi` property.
* Add the `action` emitted by Curi to the store.

## 1.0.0-alpha.3

* `Response` type replaces `AnyResponse`.

## 1.0.0-alpha.2

* Re-add Curi config reducer and syncing in `syncResponses`. This will allow the user to grab everything from their store instead of having to use `curious` to get the values off of React's `context`.

## 1.0.0-alpha.1

* Switch to TypeScript

* Dropped the config reducer because the actual configuration object should not be changing in your application. You can modify the configuration object (for example by setting new routes), but you should always have the same base object. If you want to have the configuration object in your store, you can just include it in the initial state.
