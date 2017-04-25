# curi-middleware-query

## Install

```
npm install --save curi-middleware-query
```

### UMD

```html
<script src="https://unpkg.com/curi-middleware-query@0.1.0/umd/curi-middleware-query.js"></script>
<!-- there is also a min script: curi-middleware-query.min.js -->
```

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
