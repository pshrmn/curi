# Curi

[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg?style=flat-square
[build]: https://travis-ci.org/pshrmn/curi

A set of **experimental** configuration-based URI routing packages.

You can test it out by forking this [codepen](https://codepen.io/pshrmn/pen/mmebOK).

For a reference on some of the terms used with `curi`, please see the [glossary](./docs/GLOSSARY.md)

## curi

[package](/packages/curi) + [source](/packages/curi/src) + [documentation](/packages/curi/docs)

`curi` provides the core routing functionality. It is used to create a configuration object using a `history` object and a `routes` array.

```js
const history = createBrowserHistory();
const routes = [
  {
    name: 'Home',
    path: '',
    value: Home,
  },
  {
    name: 'About',
    path: 'about',
    preload: () => {
      return import('./components/About')
        .then(module => { store.register('About', module.default); });
    }
    call: () => store.get('About')
  }
];
```

The configuration object has a `subscribe` method that your application can pass a function to in order to be informed of location changes. Any time the location changes, the subscribed function will be called.

When the subscribed function is called, it will be passed a "response" object. The subscribed function will also be called immediately, being passed the most recently created response.

Response objects describe how a location matches up against the config object's routes.

```js
import createConfig from 'curi';

const config = createConfig(history, routes);

// This line is important. Please see the document linked below this example
// for more information.
config.ready().then(() => {
  config.subscribe((response) => {
    /*
     * response = {
     *   status: 200,
     *   location: { pathname: '/', ... },
     *   name: 'Home',
     *   body: function Home() { ... }
     * }
     */
  });
})
```

For more information on why `config.ready()` is used please see the note on [Promises](./docs/Promises.md).

## curi-react

[package](/packages/curi-react) + [source](/packages/curi-react/src) + [documentation](/packages/curi-react/docs)

`curi-react` provides a communication layer between the `curi` configuration object and your application.

`curi-react` provides a `<Navigator>` component that can be used to re-render your application whenever the location changes. It also provides `<Link>` and `<Redirect>` components that can be used to trigger navigation.

```js
import { Navigator } from 'curi-react';

config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config}>
      {(response, config) => (
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
