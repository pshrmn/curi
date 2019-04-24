## 2.0.0-beta.6

* Add `url` method to `CuriRouter` interface.
* Modify `navigate` method argument to receive a URL string instead of route details.

## 2.0.0-beta.5

* Add `ResponseAndNav` type, which is an object with response and navigation properties.

## 2.0.0-beta.4

* Rename `route.response` to `route.respond`.
* Add `meta` property to response/settable response properties.
* Remove `title`, `status`, and `error` types from response/settable response properties.
* Remove `() => void` wrapper types.
* Remove `RouterOptions` type.

## 2.0.0-alpha.1

* `redirect`, not `redirect_to`.

## 2.0.0-alpha.0

* Move common types from `@curi/router` to this package.
