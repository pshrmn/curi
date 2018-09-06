## Next

* Revert dual-mode (not ready yet!).

## 1.0.0-beta.3

* Support dual-mode package (CJS/ESM) builds.

## 1.0.0-beta.2

* Export a `curiProvider()` function to create a routing provider component instead of a `<CuriProvider>`.

## 1.0.0-beta.1

* Add `preventScroll` prop to `<Focus>`. When `false` (default), the page will scroll to the element that it focuses. When `true`, the page will not scroll.

## 1.0.0-beta.0

* Added `@curi/react-dom`. This package has its own `<Link>` and `<Focus>` components, which rely on DOM APIs. This package re-exports all of `@curi/react`'s exports.
