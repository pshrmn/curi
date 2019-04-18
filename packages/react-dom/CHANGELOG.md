## Next

* Fix UMD builds.

## 2.0.0-beta.7

* Spread `forward` props to link elements before "native" props.

## 2.0.0-beta.6

* Revert snake case. `create_router_component` is now `createRouterComponent`.

## 2.0.0-beta.5

* Add `useRouter` hook. Other hooks that access the `router` but not the `response`/`navigation` have been switched to `useRouter` to prevent unnecessary re-renders.
* Rename `useCuri` to `useResponse`.
* Rename `Curious` to `ResponseConsumer`.
* Export `RouterConsumer` context consumer component.

## 2.0.0-beta.3

* Import common Curi types from `@curi/types`.

## 2.0.0-beta.2

* `<Link>` uses `history.href`.

## 2.0.0-beta.0

* Rename `curiProvider` to `create_router_component`
* Use snake cased `history.to_href`

## 2.0.0-alpha.2

* Split `Link` into `Link` (regular `children`) and `AsyncLink` (`children` is a render-invoked function).

## 2.0.0-alpha.1

* Internal `Link` changes.

## 2.0.0-alpha.0

* Use hooks in `Link`.
* `Link` no longer does shallow prop comparison (this can be added on the user's end using `React.memo`).
* Use hooks in `Router` (component created by `curiProvider`).
* Add `useCuri` React hook for reading context.
* Add `useActive` React hook for checking if a route is "active".
* Add `useBlock` React hook for blocking navigation.
* Add `useNavigating` React hook for cancelling async navigation.
* Add `useHref` React hook for generating an HREF string.
* Add `useLocation` React hook for generation a location object.
* Remove `Active` component (prefer `useActive`).
* Remove `Block` component (prefer `useBlock`).
* Remove `Navigating` component (prefer `useNavigating`).

## 1.2.1

* `<Link>` uses `router.navigate()`'s return function to prevent unnecessary `setState`s.

## 1.2.0

* Add `forward` prop to `Link` for passing props to rendered component.
* Deprecate passing props from `Link` to rendered component.
* `<Link>` takes `name` prop, preferable over `to`.
* Only export public TypeScript types.
* `<Link>` with no `to` prop outputs anchor with relative `href`.
* `<Link>` is no longer a pure component.
* Add `<Navigating>` component, which lets the user know when asynchronous routes are navigating and cancel the navigation.

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
