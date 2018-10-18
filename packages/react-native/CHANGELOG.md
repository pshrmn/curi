## Next

* Add `<Navigation>` component, which lets the user know when asynchronous routes are navigating and cancel the navigation.

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
