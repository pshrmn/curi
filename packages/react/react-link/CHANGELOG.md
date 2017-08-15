## 1.0.0-beta.3

* Switched to scoped package: `@curi/react-link`.

## 1.0.0-beta.1

* Getting close to where this should be ready for release, so switching to beta version.

## 0.7.0

* When the `to` prop is not provided, will use the current location object's `pathname`.

## 0.6.0

* Switch to the [`hickory`](https://github.com/pshrmn/hickory) package for history. With this change, the `<Link>` component now uses `history.update` instead of `history.push` to better mimic anchor behavior in the browser.

## 0.5.0

* New build (uses Rollup to output a single file for each build type).

## 0.4.2

* Renamed `component` to `anchor`. Added some more documentation that will hopefully discourage using this for rendering non-anchor elements.

## 0.4.0

* Add support for rendering any component inside of a `<Link>`. **Use with caution**
