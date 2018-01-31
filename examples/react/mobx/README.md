# MobX

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/react/mobx)

**Note:** This may no longer be necessary.

MobX integration with Curi is pretty easy. The `@curi/mobx` package provides a class store that will automatically subscribe to your router and update the store when responses are emitted. Then, you can just hook up the `<CuriBase>` component to your MobX store for automatic re-renders.
