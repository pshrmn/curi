## 0.3.0

* Switch to the [`hickory`](https://github.com/pshrmn/hickory) package for history. With this, the `<Block>` is completely refactored. Now, it takes a `confirm` function prop, which is the function that will be called to confirm/deny navigation. This change should make the `<Block>` easier to use.

## 0.2.0

* New build (uses Rollup to output a single file for each build type).
