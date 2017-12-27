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
