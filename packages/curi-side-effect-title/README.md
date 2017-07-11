# curi-side-effect-title

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-side-effect-title.svg
[npm-link]: https://npmjs.com/package/curi-side-effect-title

A side effect function that sets `document.title` using the response's `title` property. 

## Installation

```js
npm install --save curi-side-effect-title
```

### Script

If you wish to use `curi-side-effect-title` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi-side-effect-title@0.1.2/dist/curi-side-effect-title.js"></script>
<!-- there is also a min script: curi-side-effect-title.min.js -->
<script type="text/javascript">
  const createTitleSideEffect = window.CuriSideEffectTitle;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi-side-effect-title` script build, open https://unpkg.com/curi-side-effect-title/dist in your browser and copy the link address for the `curi-side-effect-title.js` file. That will provide you with the URI of the most recent release.

## Usage

```js
import createConfig from 'curi';
import createTitleSideEffect from 'curi-side-effect-title';

const setTitle = createTitleSideEffect();

const config = createConfig(history, routes, {
  sideEffects: [setTitle]
});
```

In order for this to work, you will need to set `title` properties on your routes. You can learn more about `route.title` in the [route documentation](../curi/docs/API/route.md#title)


You can provide a `prefix` and/or a `suffix` string that will be included before/after the title.

```js
const prefixedTitle = createTitleSideEffect({ prefix: 'Before |'});
// response.title = 'Middle'
// document.title = 'Before | Middle';

const suffixedTitle = createTitleSideEffect({ suffix: '| After'});
// response.title = 'Middle'
// document.title = 'Middle | After';
```
