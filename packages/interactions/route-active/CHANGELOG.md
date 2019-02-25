## Next

* Use `SessionLocation` type

## 2.0.0-alpha.0

* Optional arguments (`partial`, `params`, and `locationCheck`) are now grouped in the third argument.
* Add `locationCheck` to check non-pathname segments of the response's location.

## 1.1.0

* No longer warns when adding duplicate route name (should be caught be `prepareRoutes`).

## 1.0.2

* Add `sideEffects: false` hint for Webpack.

## 1.0.1

* Add dev guard to log to only call in development.

## 1.0.0-beta.11

* Revert dual-mode (not ready yet!).

## 1.0.0-beta.10

- Support dual-mode package (CJS/ESM) builds.

## 1.0.0-beta.8

- Include package name in warning when attempting to overwrite a registered route.

## 1.0.0-beta.7

- Switch script builds from IIFE to UMD

## 1.0.0-beta.6

- Moved to `@curi/route-active`.
- Removed source maps from `dist`.

## 1.0.0-beta.5

- Add `reset` property.

## 1.0.0-beta.4

- Switch to TypeScript

## 1.0.0-beta.3

- Switched to scoped package: `@curi/addon-active`.

## 1.0.0-beta.1

- Getting close to where this should be ready for release, so switching to beta version.

## 0.2.0

- New build (uses Rollup to output a single file for each build type).
