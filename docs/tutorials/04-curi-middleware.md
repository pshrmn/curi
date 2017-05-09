# Curi Middleware Tutorial

## Adding middleware

Curi middleware allows you to interact with a response object before it is emitted to any subscriber functions. This allows you to modify it or just use its values to perform other actions.

Middleware functions receive a response object as their argument and return a response object. The returned response object will be what it emitted to subscribers.

```js
function randomMiddleware(resp) {
  resp.randomValue = Math.random();
  return resp;
}
```

You add middleware functions to your configuration object by adding a `middleware` array to the `options` object (the third agument) of `createConfig`.

```js
const config = createConfig(
  history,
  routes,
  {
    middleware: [randomMiddleware]
  }
);
```

If you provide multiple mMiddleware functions, they will be chained together so that the result of one will be passed as the argument to the next.

Besides passing it to the `creatConfig` call, you never have to do anything else with the middleware. It will be called every time a new response is generated.

A middleware function does not need to modify the response. You could also use middleware would be to write a logger. Not all responses are emitted, so you cannot rely on `config.subscribe` to receive a record of all responses. If navigation occurs before a response is emitted (for example, if the route matched by an initial navigation has a `preload`/`load` function that does not resolve until after a subsequent navigation occurs).

## "Official" middleware

`curi-middleware-query` is an "official" middleware package for Curi. It exports a middleware factory function that takes a query string parsing function and returns a middleware function. When it runs, the middleware will parse a response's `location.search` string and set the resulting object as `response.query`.

```js
import { parse } from 'qs';
import createQueryMiddleware from 'curi-middleware-query';

const queryMiddleware = createQueryMiddleware(parse);
const config = createConfig(
  history,
  routes,
  {
    middleware: [queryMiddleware]
  }
);
```

## Creating middleware

Writing your own middleware just requires you to write a function that receives an object as its argument, does something, and then returns an object (most likely the same one as its received).

Below is a middleware function that sets a `modified` property on the object.

```js
function myMiddleware(response) {
  response.modified = true;
  return response;
}

const config = createConfig(history, routes, {
  middleware: [myMiddleware]
});
```

That really is all there is required to know in order to write your own middleware. You may want to review the [response properties](../../packages/curi/docs/API/response.md) to know which properties you should expect a response to have.
