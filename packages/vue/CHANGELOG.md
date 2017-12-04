## Next

* Export an `installCuri` function to handle registering Curi and automatically updating the `response`/`action` after location changes.
* `CuriPlugin` is now a named export instead of a default export.
* Make the `$curi` object reactive.

## 1.0.0-beta.9

* Add `active` support to the `<curi-link>`, where `active` is an object with a `merge` function and an optional `partial` boolean.
* Expand the `$curi` object to contain `response` and `action` (`this.$curi = { config, response, action }`).

## 1.0.0-beta.8

* `<curi-link>` uses `history.navigate`, not `history.update`.

## 1.0.0-beta.7

* Remove `<curi-redirect>`. This was inspired by React Router, but it doesn't really serve a point. Redirects should either be known pre-render, in which case they can be made in `route.load` or can be manually performed using `curi.history.replace`.

## 1.0.0-beta.6

* Update `<curi-block>` to used watchers instead of `beforeUpdate`. This way, it does not rely on the `<curi-block>` having children to ensure an update.

## 1.0.0-beta.5

* Switch to TypeScript

## 1.0.0-beta.4

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
