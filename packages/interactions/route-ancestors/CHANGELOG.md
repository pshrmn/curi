## Next

* Add `sideEffects: false` hint for Webpack.

## 1.0.1

* Add dev guard to log to only call in development.

## 1.0.0-beta.10

* Revert dual-mode (not ready yet!).

## 1.0.0-beta.9

- Support dual-mode package (CJS/ESM) builds.

## 1.0.0-beta.8

- Include package name in warning when attempting to overwrite a registered route.

## 1.0.0-beta.7

- Switch script builds from IIFE to UMD

## 1.0.0-beta.6

- Moved to `@curi/route-ancestors`.
- Removed source maps from `dist`.

## 1.0.0-beta.5

- Add `reset` property.
- Return `undefined` if requested route is not registered.

## 1.0.0-beta.4

- Switch to TypeScript

## 1.0.0-beta.3

- Switched to scoped package: `@curi/addon-ancestors`.

## 1.0.0-beta.1

- Getting close to where this should be ready for release, so switching to beta version.

## 0.2.1

- When get is called with no arguments, it returns a copy of the array. This prevents bugs from happening when the user manipulates the received array.

## 0.2.0

- New build (uses Rollup to output a single file for each build type).
