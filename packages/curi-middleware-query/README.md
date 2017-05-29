# curi-middleware-query

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-middleware-query.svg
[npm-link]: https://npmjs.com/package/curi-middleware-query

A middleware function that adds a `query` object to response objects.

## Install

```
npm install --save curi-middleware-query
```

### UMD

```html
<script src="https://unpkg.com/curi-middleware-query@0.1.0/umd/curi-middleware-query.js"></script>
<script type="text/javascript">
  const queryMiddleware = window.CuriMiddlewareQuery;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most
up to date version of the `curi` UMD build, open https://unpkg.com/curi-middleware-query/umd in your
browser and copy the link address for the `curi-middleware-query.js` file. That will provide you
with the URI of the most recent release. There is also a minimized version of the bundle
if you change the file name in the URI to `curi-middleware-query.min.js`.

## Usage

`curi-middleware-query` does not export a middleware function. Instead, it provides you with a factory function that you can use to generate a middleware function.

The exported function expects to be passed a function that will parse a search string.

```js
import createQueryMiddleware from 'curi-middleware-query';
import { parse } from 'qs';

const queryMiddleware = createQueryMiddleware(parse);

const config = createConfig(history, routes, {
  middleware: [queryMiddleware]
});
```

Along with [`qs`](https://www.npmjs.com/package/qs), other parsing packages include [`querystring`](https://www.npmjs.com/package/querystring) and [`query-string`](https://www.npmjs.com/package/query-string). You will have to look into each one to determine which is right for parsing your `search` string.

If you need to pass options to the parse function, you should create a function calls the parse function with the desired options and pass that function to the middleware factory.

```js
import createQueryMiddleware from 'curi-middleware-query';
import { parse } from 'qs';

function parseWithOptions(search) {
  return parse(search, { allowDots: true });
}

const queryMiddleware = createQueryMiddleware(parseWithOptions);
```
