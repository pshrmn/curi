# @curi/mobx

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/@curi/mobx.svg
[npm-link]: https://npmjs.com/package/@curi/mobx

**EXPERIMENTAL!**

`@curi/mobx` provides MobX integration for your application.

## Installation

```
npm install --save @curi/mobx
```

For more information, please check out the [`@curi/mobx`](https://curi.js.org/packages/@curi/mobx) page on the documentation website.

## Usage

```jsx
import CuriStore from "@curi/mobx";

const router = curi(history, routes);

const curiStore = new CuriStore(router);

const ResponsiveBase = inject(({ curi }) => ({
  router: curi.router,
  response: curi.response,
  action: curi.action
}))(observer(CuriBase));

router.respond(
  () => {
    ReactDOM.render(
      <Provider curi={curiStore}>
        <ResponsiveBase render={render} />
      </Provider>,
      holder
    );
  },
  { once: true }
);
```
