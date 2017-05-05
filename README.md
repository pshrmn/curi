# Curi - A Config Router

[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg?style=flat-square
[build]: https://travis-ci.org/pshrmn/curi

A set of configuration-based URI routing packages.

You can test it out with these small demos:
* [CodeSandbox](https://codesandbox.io/embed/gLX5W2gvj)
* [CodePen](https://codepen.io/pshrmn/pen/mmebOK)

For a reference on some of the terms used with Curi, please see the [glossary](./docs/GLOSSARY.md)

Packages:
* [curi](#curi)
* [Addons](#addons)
  * [pathname (built-in)](#pathname)
  * [curi-addon-prefetch](#curi-addon-prefetch)
* [Middleware](#middleware)
  * [curi-middleware-query](#curi-middleware-query)
* [React](#react)
  * [curi-react](#curi-react)
  * [curi-react-navigator](#curi-react-navigator)
  * [curi-react-link](#curi-react-link)
  * [curi-react-block](#curi-react-block)
  * [curi-react-redirect](#curi-react-redirect)
  * [curi-react-curious](#curi-react-curious)
* [Examples](#examples)

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

// This line is important. Please see link below.
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

## addons

#### pathname

[source](/packages/curi/src/addons/pathname.js) + [documentation](/packages/curi/docs/API/addons/pathname.md)

The `pathname` addon is always used, so you do not need to install it separately.

#### `curi-addon-prefetch`

[package](/packages/curi-addon-prefetch) + [source](/packages/curi-addon-prefetch/src/index.js) + [documentation](/packages/curi-addon-prefetch/README.md#usage)

The `prefetch` addon allows you to call a route's `load` function outside of navigation. If you use this, your `load` function should have a caching mechanism to prevent duplicate data fetches because the `load` function will be called again during actual navigation.

## middleware

#### `curi-middleware-query`

[package](/packages/curi-middleware-query) + [source](/packages/curi-middleware-query/src/index.js) + [documentation](/packages/curi-middleware-query/README.md#usage)

The `query` middleware exports a middleware factory. The factory takes a parse function and returns a middleware function that will parse `response.location.search` and store the parsed object as `response.query`.

## React

Curi isn't limited to use with React, but it works well with React. These are some "official" Curi packages that help with creating a Curi/React application.

#### `curi-react`

[package](/packages/curi-react) + [source](/packages/curi-react/src) + [documentation](/packages/curi-react/docs)

`curi-react` provides a communication layer between the `curi` configuration object and your application. It is intended to be used with React web applications.

The components that it provides are actually re-exported from other Curi packages. These are:

* [`<Navigator>` from `curi-react-navigator`](#curi-react-navigator)
* [`<Link>` from `curi-react-link`](#curi-react-link)
* [`<Block>` from `curi-react-block`](#curi-react-block)
* [`<Redirect>` from `curi-react-redirect`](#curi-react-redirect)

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

#### `curi-react-navigator`

[package](/packages/curi-react-navigator) + [source](/packages/curi-react-navigator/src)

A component that receives a Curi configuration object as a prop and subscribes to location changes.

```js
<Navigator config={config}>
  {(response) => {
    return response.body ? <response.body /> : null;
  }}
</Navigator>
```

#### `curi-react-link`

[package](/packages/curi-react-link) + [source](/packages/curi-react-link/src)

A component that uses route names to create HTML anchors for navigation within an application.

```js
<Link to='Home'>Home</Link>
```

#### `curi-react-block`

[package](/packages/curi-react-block) + [source](/packages/curi-react-block/src)

A component that will give the user the opportunity to cancel navigation when some conditions are met.

#### `curi-react-redirect`

[package](/packages/curi-react-redirect) + [source](/packages/curi-react-redirect/src)

A component that will automatically cause navigation when it is rendered.

#### `curi-react-curious`

[package](/packages/curi-react-curious) + [source](/packages/curi-react-curious/src)

A higher-order component to give nested components access to the Curi config object without having to manually pass it as a prop. This allows you to easily access the configuration object's `history`/addons.

```js
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        Installed Addons: {Object.keys(this.props.curi.addons).join(', ')}
      </div>
    );
  }
}

export default curious(MyComponent);
```

## Examples

[package](/packages/curi-examples)

This is not a "real" package, but instead it is a collection of small applications that show you what you can do with `curi` and `curi-react`.
