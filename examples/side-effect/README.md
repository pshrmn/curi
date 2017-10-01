# Side Effects

[CodeSandbox demo](https://codesandbox.io/github/pshrmn/curi/tree/master/examples/side-effect)

Side effects are pretty straightforward. Once a response has completed (any `preload` and `load` functions have resolved), the `Response`'s properties are used to create a JavaScript object. Then, any subscribed functions are called and passed that JavaScript object as their argument. Between those two steps, side effect functions can be run. They receive the new response as well as the action type used to trigger the navigation (`POP`, `PUSH`, or `REPLACE`).

A side effect function just does something using its arguments. It is basically a subscriber, but a permanent one (cannot be removed).

You pass any side effect functions that you want to use to the `createConfig` call, using the `sideEffects` property of the `options` object.

```js
import createConfig from 'curi';
import mySideEffect from './mySideEffect';

const config = createConfig(history, routes, {
  sideEffects: [mySideEffect]
});
```
