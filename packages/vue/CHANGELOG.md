## Next

* Add `<curi-block>` component for declaratively blocking navigation (until the user confirms).
* Add cases when clicking a `<curi-link>` should not navigate using `hickory`.

## 1.0.0-beta.3

* Switched to scoped package: `@curi/vue`.

## 1.0.0-beta.1

* Getting close to where this should be ready for release, so switching to beta version.

## 0.3.0

* Switch to the [`hickory`](https://github.com/pshrmn/hickory) package for history. With this change, the `Link` component now uses `history.update` instead of `history.push` in order to mimic browser anchor behavior.

## 0.2.0

* New build (uses Rollup to output a single file for each build type).
