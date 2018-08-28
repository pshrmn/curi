## 1.0.0-beta.13

- Include package name in warning when attempting to overwrite a registered route.

## 1.0.0-beta.12

- Switch script builds from IIFE to UMD

## 1.0.0-beta.11

- `which` takes an array of `match` function names.

## 1.0.0-beta.10

- Add `which` object argument to specify which async functions to call. If not provided, all available functions are called. When `which` is provided, only functions with `true` `which` properties will be called.

## 1.0.0-beta.9

- If a requested route is not registered, Promise resolves object with `error` property instead
  of throwing.
- Support prefetching both `on.every()` _and_ `on.initial()`.

## 1.0.0-beta.8

- Update type of props passed to `get()`.

## 1.0.0-beta.7

- Moved to `@curi/route-prefetch`.
- Switch to `on.every()`.
- Removed source maps from `dist`.

## 1.0.0-beta.6

- Update to use the new `match.every` API.

## 1.0.0-beta.5

- Add `reset` property.

## 1.0.0-beta.4

- Switch to TypeScript

## 1.0.0-beta.3

- Switched to scoped package: `@curi/addon-prefetch`.

## 1.0.0-beta.1

- Getting close to where this should be ready for release, so switching to beta version.

## 0.2.0

- New build (uses Rollup to output a single file for each build type).

## 0.1.2

Updated the addon to reflect the new `route.load` arguments (`load(params, respCreator)`).
