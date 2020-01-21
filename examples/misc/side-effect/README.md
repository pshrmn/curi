# Side Effects

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/misc/side-effect)

Side effects are pretty straightforward. Once a response has completed (any `preload` and `load` functions have resolved), the `Response`'s properties are used to create a JavaScript object. Then, any subscribed functions are called and passed that JavaScript object as their argument. Between those two steps, side effect functions can be run. They receive the new response as well as information about the navigation that triggered the new response.

A side effect function just does something using its arguments. It is basically a subscriber, but a permanent one (cannot be removed).

You pass any side effect functions that you want to use to the `curi` call, using the `sideEffects` property of the `options` object.

```js
import curi from 'curi';
import mySideEffect from './mySideEffect';

let router = createRouter(history, routes, {
  sideEffects: [mySideEffect]
});
```
