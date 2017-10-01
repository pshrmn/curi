## Curi Examples

Example projects that use `curi` and `curi-react`.

* [transitions](./transitions)
* [modal](./modal)
* [active links](./active-links)
* [code splitting](./code-splitting)
* [server rendering](./server-rendering)
* [blocking navigation](./blocking-navigation)
* [prefetching data](./prefetch-data)
* [with redux](./redux)
* [middleware](./middleware)
* [UMD (vanilla JS with <script> tags)](./umd-example)
* [updating routes](./updating-routes)

For any example that you want to run locally, you need to install its dependencies and build the bundle.

```sh
cd <example-folder>
npm install
npm run webpack
```

While most of these examples are client side only, they still use browser history objects, which require a server to handle dynamic requests. This directory contains a `server.js` file that you can run to serve the examples.

```sh
# make sure to install express
npm install
# usage
node server.js <example-folder>
# for example, to run the modal example:
node server.js modal
```
