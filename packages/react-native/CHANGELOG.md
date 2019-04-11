## Next

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

## 1.1.1

* `<Link>` uses `router.navigate()`'s return function to prevent unnecessary `setState`s.

## 1.1.0

* Add `forward` prop to `Link` for passing props to rendered component.
* Deprecate passing props from `Link` to rendered component.
* `<Link>` takes `name` prop, preferable over `to`.
* Only export public TypeScript types.
* `<Link>` is no longer a pure component.
* Add `<Navigating>` component, which lets the user know when asynchronous routes are navigating and cancel the navigation.

## 1.0.2

* Guard `setState()` calls for unmounted `<Link>`.

## 1.0.1

* Add `sideEffects: false` hint for Webpack.
* Component returned by `curiProvider()` fully stores `emitted` value in state.

## 1.0.0-beta.13

* Revert dual-mode (not ready yet!).

## 1.0.0-beta.12

* Support dual-mode package (CJS/ESM) builds.

## 1.0.0-beta.11

* Export a `curiProvider()` function to create a routing provider component instead of a `<CuriProvider>`.

## 1.0.0-beta.10

* Change dependency to `@curi/react-universal` from `@curi/react`.

## 1.0.0-beta.9

* Fix bad `@curi/route-active` dependency.

## 1.0.0-beta.8

* `<Link>` is now a pure component.

## 1.0.0-beta.7

* `<Link>`'s `children` can be a React node or a render-invoked prop that receives the `<Link>`'s current `navigating` state.

## 1.0.0-beta.6

* Forward `<Link>` ref to actual component (e.g. `<TouchableHighlight>`).

## 1.0.0-beta.5

* TypeScript fix

## 1.0.0-beta.4

* Use `router.navigate()` in `<Link>`.
* Update `<Link>` `method` values `<Link method={"ANCHOR"|"PUSH"|"REPLACE"}>`.

## 1.0.0-beta.3

* Add `hash`, `query`, and `state` props to `<Link>`, remove `details`.
* Remove `<Link active>`.
* Update `<Active>` to use a render-invoked `children` prop. Removes the `merge`, `details`, and `extra` props.
* Use the new React Context API released in React 16.3. This forces the minimum React version for `@curi/react` projects to `16.3`. The minimum React Native version is also bumped to `0.55`.

## 1.0.0-beta.2

* Add `method` prop to `<Link>` to specify which `history` navigation method to use for navigation. Options are `navigate`, `push`, and `replace` (defaults to `navigate`).

## 1.0.0-beta.1

* (Internal) `<CuriProvider>` uses `router.respond(fn, { observe: true })`.
* Use `react-broadcast` to simulate new context API. This removes the `<ResponsiveBase>` and `<CuriBase>` components in favor of a single `<CuriProvider>`. The `<Curious>` prop also now just expects a `children` render function prop.
* (Internal) Router's response handler receives `Emitted` object.

## 1.0.0-alpha.4

* Add a `<ResponsiveBase>` component. This is just a `<CuriBase>` wrapped in a `<Curious>`.
* `<Curious>` does not initially call response handler (prevents extra render).
* `<CuriBase render>` passes a single `CuriProps` object to the `render` function instead of three arguments.

## 1.0.0-alpha.3

* Switch from `action` to `navigation` (which contains an `action` as well as the previous `response`).
  * Make `navigation` a required prop of the `<CuriBase>` (`action` was optional).
  * `<Curious>` injects `navigation`, not `action`.
* `<Curious>` sets initial `response`/`action` when responsive.

## 1.0.0-alpha.2

* Use `@curi/react` `v1.0.0-beta.17`.

## 1.0.0-alpha.1

* Re-export `<Curious>`, not `curious()`.
