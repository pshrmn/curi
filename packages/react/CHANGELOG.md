## 1.0.0-beta.7

* Switch to TypeScript
* Rename `<Block>`'s `when` prop to `active`.

## 1.0.0-beta.6

* Merge the `@curi/react-___` packages back into `@curi/react`. Instead, rely on Babel 7's `#__PURE__` comments to remove unused components. **Update**: This still does not actually work due to static properties being places outside of the closure that Babel creates. This _should_ be fixed sometime soon, but for the time being, tree-shaking will not actually work here.

## 1.0.0-beta.5

* Fixed build

## 1.0.0-beta.4

* Switched to scoped package: `@curi/react`.

## 1.0.0-beta.1

* Getting close to where this should be ready for release, so switching to beta version.

## 0.8.0

* Updated to include new versions of components that are adapted to use the [`hickory`](https://github.com/pshrmn/hickory) package.

## 0.7.0

* New build (uses Rollup to output a single file for each build type).
