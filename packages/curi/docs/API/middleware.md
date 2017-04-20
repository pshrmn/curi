# Middleware

Middleware give you the opportunity to modify a response object before it is passed to all of the subscribers.

Middleware functions are passed to `createConfig` using the `middleware` property of the `options` object.

```js
const config = createConfig(history, routes, {
  middleware: [one, two]
});
```

A middleware function is simply a function that receives a response object as its argument and returns a response object (probably the same object). This can be useful if you want to modify properties of the generated response or to add additional properties to the object.

For example, you might want the `search` string from the response's `location` to be parsed into a query object. You could use a middleware function to pass the `location.search` value to a query string parser, and store the generated object on the response.

```js
import { parse } from 'qs';

function queryMiddleware(response) {
  // strip the leading ? from the search string
  const { search } = response.location;
  const noQuestion = search.charAt(0) === '?' search.slice(1) : search
  response.query = parse(noQuestion);
  return response;
}
```
