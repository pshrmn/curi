# Create your own middleware

A middleware function is incredibly simple. It receives a response object as its argument, and it is expected to return a response object. Typically, you would just return the same object after modifying it, but this does not have to be the case.

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

That really is all there is required to know in order to write your own middleware. You may want to review the [response properties](../API/response.md) to know which properties you should expect a response to have.

A middleware function does not need to modify the response. You could also use middleware would be to write a logger. Not all responses are emitted, so you cannot rely on `config.subscribe` to receive a record of all responses. If navigation occurs before a response is emitted (for example, if the route matched by an initial navigation has a `preload`/`load` function that does not resolve until after a subsequent navigation occurs).
