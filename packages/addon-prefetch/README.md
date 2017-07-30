# @curi/addon-prefetch

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/@curi/addon-prefetch.svg
[npm-link]: https://npmjs.com/package/@curi/addon-prefetch

The prefetch addon enables you to run a `uri`'s `load` function prior to actually navigating to that location. This is only useful for in-app navigation. If the user uses the browser's forward/back buttons, the loading will be handled within the Curi configuration object.

**Note:** If you use this addon, then your `load` functions should be caching the data. This is because the route's `load` function is always called when generating a response, effectively making a duplicate call.

## Installation

```js
npm install --save @curi/addon-prefetch
```

For more information, please check out the [`@curi/addon-prefetch`](https://curi.js.org/curi/packages/@curi/addon-prefetch) page on the documentation website.
