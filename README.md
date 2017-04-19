# curi

[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg?style=flat-square
[build]: https://travis-ci.org/pshrmn/curi

A set of **experimental** configuration-based URI routing packages.

You can test it out by forking this [codepen](https://codepen.io/pshrmn/pen/mmebOK).

For a reference on some of the terms used with `curi`, please see the [glossary](./GLOSSARY.md)

## curi

[package](/packages/curi) + [source](/packages/curi/src) + [documentation](/packages/curi/docs)

`curi` provides the core routing functionality. It is used to create a configuration object using a `history` object and a `routes` array.

```js
const history = createBrowserHistory();
const routes = [
  {
    name: 'Home',
    path: path(''),
    value: Home,
  },
  {
    name: 'About',
    path: path('about'),
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
import { createConfig } from 'curi';

const config = createConfig(history, routes);
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
```

**Note:** curi's response generation is Promise based. You should probably have a basic understanding of what they are before you continue. A few articles that might help are [JavaScript Promise API](https://davidwalsh.name/promises) and [MDN's Promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). The most basic thing to know is that a Promise is an object with `then` property. The `then` property is a function that takes another function as its argument. That function will be called when the Promise has "resolved" (unless an error occured, in which case the Promise's `catch` function is called).

Routes can have `preload` and `load` functions that are expected to return Promises. The `preload` function is useful for code splitting and the `load` function is where you would load data before rendering and possibly redirect.

When `curi` matches a route, it will wait until the matched route's `preload` and `load` (_if_ they exist) functions have resolved before calling any subscribed functions. Even if those properties do not exist, the response generation will still be asynchronous.

Because the Promises are asynchronous, it is not guaranteed that the initial response will have resolved before you call `config.subscribe`. To deal with this, the config object has a `ready` method. All that `ready` does is return a Promise that will resolve onces the initial response is ready.

You can pass a function to the `then` method of the Promise returned by `config.then` and it will be called once the initial response has resolved. Your function will be passed the response object.

```js
const config = createConfig(history, routes);
config.ready()
  .then(initialResponse => {
    // now it is safe to subscribe or do something with the response
  })
  .catch(err => {
    // unless there was an error in creating the response, in which case
    // you need to handle that.
  });
```

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
