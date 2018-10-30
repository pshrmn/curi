## Next

* Add `<Navigation>` component, which lets the user know when asynchronous routes are navigating and cancel the navigation.

## 1.1.2

* Guard `setState()` calls for unmounted `<Link>`.

## 1.1.1

* Add `sideEffects: false` hint for Webpack.
* Component returned by `curiProvider()` fully stores `emitted` value in state.

## 1.1.0

* Add `preserve` prop to `<Focus>` to preserve an existing focus (do not steal). Only works if the existing focused element is a child of the one the `ref` is attached to.

## 1.0.0-beta.4

* Revert dual-mode (not ready yet!).

## 1.0.0-beta.3

* Support dual-mode package (CJS/ESM) builds.

## 1.0.0-beta.2

* Export a `curiProvider()` function to create a routing provider component instead of a `<CuriProvider>`.

## 1.0.0-beta.1

* Add `preventScroll` prop to `<Focus>`. When `false` (default), the page will scroll to the element that it focuses. When `true`, the page will not scroll.

## 1.0.0-beta.0

* Added `@curi/react-dom`. This package has its own `<Link>` and `<Focus>` components, which rely on DOM APIs. This package re-exports all of `@curi/react`'s exports.
