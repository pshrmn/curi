## Next

* Add `<Navigation>` component, which lets the user know when asynchronous routes are navigating and cancel the navigation.

## 1.0.1

* Add `sideEffects: false` hint for Webpack.
* Component returned by `curiProvider()` fully stores `emitted` value in state.

## 1.0.0-beta.3

* Revert dual-mode (not ready yet!).

## 1.0.0-beta.2

* Support dual-mode package (CJS/ESM) builds.

## 1.0.0-beta.1

* Export a `curiProvider()` function to create a routing provider component instead of a `<CuriProvider>`.

## 1.0.0-beta.0

* Migrated from `@curi/react` to `@curi/react-universal`.
* Moved `react-dom` specific components (`<Link>` and `<Focus>`) to `@curi/react-dom`. `@curi/react-dom` also re-exports everything from `@curi/react`. You should never need to use `@curi/react` yourself, but instead choose the package for whichever renderer you are using `react-dom` or `react-native`.

**The following changelog entries are from the deprecated `@curi/react` package, which was superseded by `@curi/react-universal`:**

## 1.0.0-beta.30

* Switch script builds from IIFE to UMD
* Prepare `<CuriProvider>` for Suspense support by using `getDerivedStateFromProps()` to store subscription source (the router).
* Remove `<Prefetch>`.
* `<CuriProvider>` can accept a new `router` prop.

## 1.0.0-beta.29

* `<Prefetch when>` accepts array of match function names to call and its render-invoked `children()` function now receives a third argument: `error`.

## 1.0.0-beta.28

* `<Link>` is now a pure component.
* `<Focus>` uses a 0 second timeout to delay focusing.

## 1.0.0-beta.27

* Add `<Focus>` component for auto-focusing after new responses.

## 1.0.0-beta.26

* `<Link>` children can be a render-invoked prop that receives the link's navigating state.
* Warn when the `ref` passed to `<Prefetch>`'s render-invoked function is `null` after mounting.
* Pass the object resolved by `route.prefetch()` to `<Prefetch>`'s `children` render-invoked function.

## 1.0.0-beta.25

* Fix `<Prefetch>` on the server and don't change refs.

## 1.0.0-beta.24

* Add `<Prefetch>` component for prefetching a route's data. Requires `@curi/router-prefetch`.
* Forward `<Link>` ref to actual component (e.g. `<a>`).

## 1.0.0-beta.23

* TypeScript fix

## 1.0.0-beta.22

* Use `router.navigate()` in `<Link>`.

## 1.0.0-beta.21

* Add `hash`, `query`, and `state` props to `<Link>`, remove `details`.
* Remove `<Link active>`.
* Update `<Active>` to use a render-invoked `children` prop. Removes the `merge`, `details`, and `extra` props.
* Use the new React Context API released in React 16.3. This forces the minimum React version for `@curi/react` projects to `16.3`.

## 1.0.0-beta.20

* (Internal) `<CuriProvider>` uses `router.respond(fn, { observe: true })`.
* Use `react-broadcast` to simulate new context API. This removes the `<ResponsiveBase>` and `<CuriBase>` components in favor of a single `<CuriProvider>`. The `<Curious>` prop also now just expects a `children` render function prop.
* (Internal) Router's response handler receives `Emitted` object.

## 1.0.0-beta.19

* Add a `<ResponsiveBase>` component. This is just a `<CuriBase>` wrapped in a `<Curious>`.
* `<Curious>` does not initially call response handler (prevents extra render).
* `<CuriBase render>` passes a single `CuriProps` object to the `render` function instead of three arguments.

## 1.0.0-beta.18

* Switch from `action` to `navigation` (which contains an `action` as well as the previous `response`).
  * Make `navigation` a required prop of the `<CuriBase>` (`action` was optional).
  * `<Curious>` injects `navigation`, not `action`.
* `<Curious>` sets initial `response`/`navigation` when responsive.

## 1.0.0-beta.17

* `<Curious>` warns if trying to pass a new `router` prop.
* `<Curious>` subscribes when given `router` prop (`responsive` not necessary).

## 1.0.0-beta.16

* Add `responsive` and `router` props to `<Curious>`, letting it listen for emitted responses.
* Switch from `curious` higher-order component to `<Curious>` with a render function.
* Rename `<Link>`'s `curi` prop to `router`.

## 1.0.0-beta.15

* Refer to the Curi router as `router` instead of `config`.
* `curious` injects `router` prop instead of `curi`.
* Export types from root.

## 1.0.0-beta.14

* Make passing the `action` to `<CuriBase>` optional (it will default to `POP`).
* Rename `<Navigator>` to `<CuriBase>`.
* Add `extra` and `details` props to the `<Active>` component.
* Add an `extra` function to the `<Link active>` object, which is a function that can add additional active checking using the current location and the details passed to the `<Link>`. This allows you to mark a link as active based on its `query` and/or `hash`.
* Simpler `<Link anchor>` type.
* Removed source maps from `dist`

## 1.0.0-beta.13

* `<Navigator>` no longer subscribes to Curi. Instead, the user should subscribe themselves and pass the `response` to the `<Navigator>`. In addition to the `response` prop, the `<Navigator>` also now accepts an `action` prop.
* There is now one base Curi `context` object. The object is referenced as `curi` and contains three properties: `config` (the Curi config object), `response` (the current `response` object), and `action` (the current `action` string). All components have been updated to reflect this change.
* `<Link details={{ pathname: '...' }} />` will no longer override the `pathname` generated by the `to`/`params` props.
* When `<Link>` is not provided a `to` prop, use `response.location` instead of `history.location` to get the `pathname`. Normally, these are the same object, but they could differ if clicking a link after navigation has started (but a response has not been emitted).

## 1.0.0-beta.12

* `<Link>` uses `history.navigate`, not `history.update`.

## 1.0.0-beta.11

* Update types to expect `Response` instead of `AnyResponse` from `@curi/core`.

## 1.0.0-beta.10

* Allow `<Active>`, `<Block>`, and `<Link>` to accept `curi`/`response` props (only `curi` for the `<Block>`). This should generally be unnecessary, but makes it so that we can `connect` them (using `react-redux`).
* Remove `<Provider>`. It was only adding half of the necessary `context` values (did not provide the `response`). The `<Navigator>` should be used instead.

## 1.0.0-beta.9

* Remove `<Redirect>`. This was inspired by React Router, but it doesn't really serve a point. Redirects should either be known pre-render, in which case they can be made in `route.load` or can be manually performed using `curi.history.replace`.
* Pass `action` to `<Navigator>`'s `render` function. New signature is `function(response, action, config) {}`.

## 1.0.0-beta.8

* Update React peer dependency to allow React 16.

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
