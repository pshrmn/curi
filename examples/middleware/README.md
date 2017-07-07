# Middleware

[CodeSandbox demo](https://codesandbox.io/embed/Mjpv0E9qQ)

Middleware is pretty straightforward. Once a response has completed (any `preload` and `load` functions have resolved), the `Response`'s properties are used to create a JavaScript object. Then, any subscribed functions are called and passed that JavaScript object as their argument. Between those two steps, you can modify the JavaScript object using middleware functions.

A middleware simply receives a response object as its argument, does something to modify that object, and then returns the response object.

You pass any middleware that you want to use to the `createConfig` call, using the `middleware` property of the `options` object.

```js
import createConfig from 'curi';
import myMiddleware from './myMiddleware';

const config = createConfig(history, routes, {
  middleware: [myMiddleware]
});
```
