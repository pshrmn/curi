# curi

[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg?style=flat-square
[build]: https://travis-ci.org/pshrmn/curi

A set of **experimental** configuration-based URI routing packages.

## curi

[package](/packages/curi) + [source](/packages/curi/src) + [documentation](/packages/curi/docs)

`curi` provides the core routing functionality. It is used to create a configuration object using a `history` object and a `routes` array. The configuration object has a `subscribe` method that your application can pass a function to in order to be informed of location changes. Any time the location changes, the subscribed function will be called.

When the subscribed function is called, it will be passed a "response" object. Response objects describe how a location matches up against the config object's routes.

```js
import { createConfig } from 'curi';

const config = createConfig(history, routes);
config.ready().then(initialResponse => {
  // ...
});
```

## curi-react

[package](/packages/curi-react) + [source](/packages/curi-react/src) + [documentation](/packages/curi-react/docs)

`curi-react` provides a communication layer between the `curi` configuration object and your application.

`curi-react` provides a `<Navigator>` component that can be used to re-render your application whenever the location changes. It also provides `<Link>` and `<Redirect>` components that can be used to trigger navigation.

```js
config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config}>
      {(response, history) => (
        response.body
          ? <response.body />
          : null
      )}
    </Navigator>
  ), document.getElementById('root'));
});
```

## curi-experiments

[package](/packages/curi-experiments)

This is not a "real" package, but instead it is a collection of small applications that show you what you can do with `curi` and `curi-react`.
