## Next

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
