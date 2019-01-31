# @curi/route-prefetch

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/@curi/route-prefetch.svg
[npm-link]: https://npmjs.com/package/@curi/route-prefetch

The `prefetch` route interaction lets you call a route's `resolve()` method outside of route matching.

**Note:** If you use this route interaction, then your `resolve` function should be caching the data. This is because the route's `resolve` function is always called when matching routes. Caching enables you to bail early with the prefetched data.

## Installation

```js
npm install --save @curi/route-prefetch
```

For more information, please check out the [`@curi/route-prefetch`](https://curi.js.org/packages/@curi/route-prefetch) page on the documentation website.
