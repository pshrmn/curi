# curi-middleware-title

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-middleware-title.svg
[npm-link]: https://npmjs.com/package/curi-middleware-title

A middleware function that sets `document.title` using the response's `title` property. 

## Installation

```js
npm install --save curi-middleware-title
```

### Script

If you wish to use `curi-middleware-title` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi-middleware-title@0.1.0/dist/curi-middleware-title.js"></script>
<!-- there is also a min script: curi-middleware-title.min.js -->
<script type="text/javascript">
  const createTitleMiddleware = window.CuriMiddlewareTitle;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi-middleware-title` script build, open https://unpkg.com/curi-middleware-title/dist in your browser and copy the link address for the `curi-middleware-title.js` file. That will provide you with the URI of the most recent release.

## Usage

```js
import createConfig from 'curi';
import createTitleMiddleware from 'curi-middleware-title';

const setTitle = createTitleMiddleware();

const config = createConfig(history, routes, {
  middleware: [setTitle]
});
```

In order for this to work, you will need to set `title` properties on your routes. You can learn more about `route.title` in the [route documentation](../curi/docs/API/route.md#title)


You can provide a `prefix` and/or a `suffix` string that will be included before/after the title.

```js
const prefixedTitle = createTitleMiddleware({ prefix: 'Before |'});
// response.title = 'Middle'
// document.title = 'Before | Middle';

const suffixedTitle = createTitleMiddleware({ suffix: '| After'});
// response.title = 'Middle'
// document.title = 'Middle | After';
```
