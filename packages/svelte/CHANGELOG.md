## Next

* This package now relies on the user using `svelte/store` to make the Curi config available to components (`new Store({ curi: { config }})`)

## 1.0.0-alpha.5

* `<Link>` uses `history.navigate`, not `history.update`.

## 1.0.0-alpha.3

* Only call `history.update` for left, non-modified `<Link>` clicks.
