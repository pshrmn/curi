## curi-react

The `curi-react` package is a grouping of components that are intended to be used in a React web application.

The provided components are:

* [`<Navigator>`](../../curi-react-navigator)
* [`<Link>`](../../curi-react-link)
* [`<Redirect>`](../../curi-react-redirect)
* [`<Block>`](../../curi-react-block)

If you are planning on using code splitting with your application (using a route object's `preload` function), you will want to implement some sort of "store" to keep references to the loaded components. Please see the [preloaded component store guide](./ComponentStore.md) for more details on how to do that.
