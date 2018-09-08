## Curi Examples

#### React Examples
* [active links](./active-links)
* [authentication](./authentication)
* [blocking navigation](./blocking-navigation)
* [breadcrumbs](./breadcrumbs)
* [code splitting](./code-splitting)
* [data loading](./data-loading)
* [modal](./modal)
* [with redux](./redux)
* [server rendering](./server-rendering)
* [side effects](./side-effect)
* [transitions](./transitions)
* [UMD (vanilla JS with <script> tags)](./umd-example)
* [updating routes](./updating-routes)

#### Vue Examples
* [basic](./basic-vue)
* [blocking navigation](./blocking-navigation-vue)
* [breadcrumbs](./breadcrumbs-vue)

#### Svelte Examples
* [basic](./basic-svelte)

For any example that you want to run locally, you need to install its dependencies and build the bundle.

```sh
cd <example-folder>
npm install
```

While most of these examples are client side only, they still use browser history objects, which require a server to handle dynamic requests. This directory contains a `server.js` file that you can run to serve the examples.

```sh
# make sure to any dependencies are installed
npm install

# build an example
node build.js <example-folder> <example-type>
# e.g.
node build.js react/modal react

# serve the example
node server.js <example-folder>
# e.g.
node server.js react/modal
```
