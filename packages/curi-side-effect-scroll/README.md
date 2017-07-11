# curi-side-effect-scroll

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-side-effect-scroll.svg
[npm-link]: https://npmjs.com/package/curi-side-effect-scroll

A side effect function that scrolls to the top of the page when navigating to new locations.

## Installation

```js
npm install --save curi-side-effect-scroll
```

### Script

If you wish to use `curi-side-effect-scroll` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi-side-effect-scroll@0.1.0/dist/curi-side-effect-scroll.js"></script>
<!-- there is also a min script: curi-side-effect-scroll.min.js -->
<script type="text/javascript">
  const createScrollSideEffect = window.CuriSideEffectScroll;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi-side-effect-scroll` script build, open https://unpkg.com/curi-side-effect-scroll/dist in your browser and copy the link address for the `curi-side-effect-scroll.js` file. That will provide you with the URI of the most recent release.

## Usage

```js
import createConfig from 'curi';
import createScrollSideEffect from 'curi-side-effect-scroll';

const scrollTo = createScrollSideEffect();

const config = createConfig(history, routes, {
  sideEffects: [scrollTo]
});
```
