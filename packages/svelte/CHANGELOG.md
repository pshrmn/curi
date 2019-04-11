## 1.0.0-beta.20

* Revert snake case. `curi_store` is now `curiStore`.

## 1.0.0-beta.16

* `<Link>` uses `history.href`.

## 1.0.0-beta.14

* Rename `curiStore` to `curi_store`
* Use snake cased `history.to_href`

## 1.0.0-beta.13

* `<Link>` uses `router.navigate()`'s return function to prevent unnecessary `set`s.

## 1.0.0-beta.11

* Use `<Link wrapper>` to pass a wrapper component. The wrapper component will be given a `navigating` prop.

## 1.0.0-beta.10

* Don't bundle components; components should be imported directly from `@curi/svelte/components`.
* Add `Navigating` component to help cancel asynchronous navigation.
* Rename `Link`'s `to` prop to `name`.
* `Link`s with no name generate a relative `href`.

## 1.0.0-beta.9

* Add `sideEffects: false` hint for Webpack.

## 1.0.0-beta.8

* Revert dual-mode (not ready yet!).

## 1.0.0-beta.7

* Support dual-mode package (CJS/ESM) builds.

## 1.0.0-beta.6

* Update to Svelte v2 minimum dependency.
* Remove `<script>` builds.

## 1.0.0-beta.5

* Add `hash`, `query`, and `state` props to `<Link>`, remove `details`.
* Add `curiStore` function to automatically sync router and store. This can create a new store or update an existing store.

## 1.0.0-beta.4

* Keep router on its own in the store as `$router`.

## 1.0.0-beta.3

* `$curi.router` not `$curi.config`.

## 1.0.0-beta.2

* Bump Svelte version (`1.48` had breaking changes)
* Removed source maps from `dist`

## 1.0.0-beta.1

* Include Svelte `.html` components in `dist` folder so users can import them instead of the pre-built modules. (`import Link from '@curi/svelte/dist/Link.html'`)

## 1.0.0-beta.0

* This package now relies on the user using `svelte/store` to make the Curi config available to components (`new Store({ curi: { config }})`)

## 1.0.0-alpha.5

* `<Link>` uses `history.navigate`, not `history.update`.

## 1.0.0-alpha.3

* Only call `history.update` for left, non-modified `<Link>` clicks.
