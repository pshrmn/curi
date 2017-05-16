<img alt="Curi - a config router" src="static/logo.png" />

[![Travis][build-badge]][build]

A set of configuration-based URI routing packages.

Just getting started? Please check out these [Curi tutorials](./docs/tutorials). Alternatively, there is a general introduction to Curi that you can read [on Medium](https://medium.com/@pshrmn/route-with-curi-221237ba71d8).

You can test Curi out with these small demos:
* [CodeSandbox](https://codesandbox.io/embed/gLX5W2gvj)
* [CodePen](https://codepen.io/pshrmn/pen/mmebOK)

There are also a number of examples in the [examples](/examples) directory, many of which provide links to CodeSandbox demos.

For a reference to some of the terms used with Curi, please see the [glossary](./docs/GLOSSARY.md)

Packages:
* [curi](#curi)
* [Addons](#addons)
  * [pathname (built-in)](#pathname)
  * [curi-addon-prefetch](#curi-addon-prefetch)
  * [curi-addon-active](#curi-addon-active)
* [Middleware](#middleware)
  * [curi-middleware-query](#curi-middleware-query)
* [React](#react)
  * [curi-react](#curi-react)
  * [curi-react-navigator](#curi-react-navigator)
  * [curi-react-link](#curi-react-link)
  * [curi-react-block](#curi-react-block)
  * [curi-react-redirect](#curi-react-redirect)
  * [curi-react-curious](#curi-react-curious)
  * [curi-react-active](#curi-react-active)
  * [curi-react-clickable](#curi-react-clickable)

## curi

[![npm][curi-version-badge]][npm-curi]

[package](/packages/curi) + [source](/packages/curi/src) + [documentation](/packages/curi/docs)

The `curi` package provides the core routing functionality for the application. It is used to create a configuration object using a `history` object and a `routes` array.

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

When the subscribed function is called, it will be passed a "response" object. The subscribed function will also be called immediately, being passed the most recently created response or `undefined` if the initial response has not yet completed.

Response objects describe how a location matches up against the config object's routes.

```js
import createConfig from 'curi';

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

### subscribe/ready

As stated above, when `subscribe` is called before the initial response is complete, then the subscriber function will be called with the argument `undefined`. There are two different approaches that you can take to deal with this:

1. You can setup your application to render something (e.g. a loading screen) when the response is `undefined`.
2. You can use `config.ready` to guarantee that the initial response has resolved before subscribing.

**Note:** If you are using Curi with a React application that uses server-side rendering, then you will have to use the second approach.

```js
// 1
config.subscribe((response) => {
  if (!response) {
    // render loading screen or maybe just null
  }
  // render actual application when response is not undefined
});


//2
config.ready().then((response) => {
  // render the application
})
```

For some more information on this, please see the note on [Promises](./docs/Promises.md).

## addons

#### pathname

[source](/packages/curi/src/addons/pathname.js) + [documentation](/packages/curi/docs/API/addons/pathname.md)

The `pathname` addon is always used, so you do not need to install it separately.

#### `curi-addon-prefetch`

[![npm][curi-addon-prefetch-version-badge]][npm-curi-addon-prefetch]

[package](/packages/curi-addon-prefetch) + [source](/packages/curi-addon-prefetch/src/index.js) + [documentation](/packages/curi-addon-prefetch/README.md#usage)

The `prefetch` addon allows you to call a route's `load` function outside of navigation. If you use this, your `load` function should have a caching mechanism to prevent duplicate data fetches because the `load` function will be called again during actual navigation.

#### `curi-addon-active`

[![npm][curi-addon-active-version-badge]][npm-curi-addon-active]

[package](/packages/curi-addon-active) + [source](/packages/curi-addon-active/src/index.js) + [documentation](/packages/curi-addon-active/README.md#usage)

The `active` addon allows you to determine if a route is "active" (its `name`/`params` match the current response's `name`/`params`).. This can be useful for giving an element a specific style when it is "active".

## middleware

#### `curi-middleware-query`

[![npm][curi-middleware-query-version-badge]][npm-curi-middleware-query]

[package](/packages/curi-middleware-query) + [source](/packages/curi-middleware-query/src/index.js) + [documentation](/packages/curi-middleware-query/README.md#usage)

The `query` middleware exports a middleware factory. The factory takes a parse function and returns a middleware function that will parse `response.location.search` and store the parsed object as `response.query`.

## React

Curi isn't limited to use with React, but it works well with React. These are some "official" Curi packages that help with creating a Curi/React application.

#### `curi-react`

[![npm][curi-react-version-badge]][npm-curi-react]

[package](/packages/curi-react) + [source](/packages/curi-react/src) + [documentation](/packages/curi-react/docs)

`curi-react` provides a communication layer between the `curi` configuration object and your application. It is intended to be used with React web applications.

The components that it provides are actually re-exported from other Curi packages. These are:

* [`<Navigator>` from `curi-react-navigator`](#curi-react-navigator)
* [`<Link>` from `curi-react-link`](#curi-react-link)
* [`<Block>` from `curi-react-block`](#curi-react-block)
* [`<Redirect>` from `curi-react-redirect`](#curi-react-redirect)

```js
import { Navigator } from 'curi-react';

ReactDOM.render((
  <Navigator config={config}>
    {(response, config) => (
      response.body
        ? <response.body />
        : null
    )}
  </Navigator>
), document.getElementById('root'));
```

#### `curi-react-navigator`

[![npm][curi-react-navigator-version-badge]][npm-curi-react-navigator]

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

[![npm][curi-react-link-version-badge]][npm-curi-react-link]

[package](/packages/curi-react-link) + [source](/packages/curi-react-link/src)

A component that uses route names to create HTML anchors for navigation within an application.

```js
<Link to='Home'>Home</Link>
```

#### `curi-react-block`

[![npm][curi-react-block-version-badge]][npm-curi-react-block]

[package](/packages/curi-react-block) + [source](/packages/curi-react-block/src)

A component that will give the user the opportunity to cancel navigation when some conditions are met.

#### `curi-react-redirect`

[![npm][curi-react-redirect-version-badge]][npm-curi-react-redirect]

[package](/packages/curi-react-redirect) + [source](/packages/curi-react-redirect/src)

A component that will automatically cause navigation when it is rendered.

#### `curi-react-curious`

[![npm][curi-react-curious-version-badge]][npm-curi-react-curious]

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

#### `curi-react-active`

[![npm][curi-react-active-version-badge]][npm-curi-react-active]

[package](/packages/curi-react-active) + [source](/packages/curi-react-active/src)

A component that modifies its `children` element when its `name` matches the current response's `name`. This component relies on the `curi-addon-active` addon.

```js
// when the response matches the <Active> component's props, the
// <div> will have its props modified by the merge function.
<Active name='Album' params={{ albumId: 7 }} merge={merge}>
  <div>...</div>
</Active>
```

#### `curi-react-clickable`

[![npm][curi-react-clickable-version-badge]][npm-curi-react-clickable]

[package](/packages/curi-react-clickable) + [source](/packages/curi-react-clickable/src)

A component that lets you make any component navigate by clicking it. **Use with caution for web applications**

```js
<Clickable component={MyComponent} to='My View'>Go to my view</Clickable>
// will render <MyComponent onClick={...}>Go to my view</MyComponent>
```


[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg
[build]: https://travis-ci.org/pshrmn/curi

[curi-version-badge]: https://img.shields.io/npm/v/curi.svg
[npm-curi]: https://npmjs.com/package/curi

[curi-addon-prefetch-version-badge]: https://img.shields.io/npm/v/curi-addon-prefetch.svg
[npm-curi-addon-prefetch]: https://npmjs.com/package/curi-addon-prefetch

[curi-addon-active-version-badge]: https://img.shields.io/npm/v/curi-addon-active.svg
[npm-curi-addon-active]: https://npmjs.com/package/curi-addon-active

[curi-middleware-query-version-badge]: https://img.shields.io/npm/v/curi-middleware-query.svg
[npm-curi-middleware-query]: https://npmjs.com/package/curi-middleware-query

[curi-react-version-badge]: https://img.shields.io/npm/v/curi-react.svg
[npm-curi-react]: https://npmjs.com/package/curi-react

[curi-react-navigator-version-badge]: https://img.shields.io/npm/v/curi-react-navigator.svg
[npm-curi-react-navigator]: https://npmjs.com/package/curi-react-navigator

[curi-react-link-version-badge]: https://img.shields.io/npm/v/curi-react-link.svg
[npm-curi-react-link]: https://npmjs.com/package/curi-react-link

[curi-react-block-version-badge]: https://img.shields.io/npm/v/curi-react-block.svg
[npm-curi-react-block]: https://npmjs.com/package/curi-react-block

[curi-react-redirect-version-badge]: https://img.shields.io/npm/v/curi-react-redirect.svg
[npm-curi-react-redirect]: https://npmjs.com/package/curi-react-redirect

[curi-react-curious-version-badge]: https://img.shields.io/npm/v/curi-react-curious.svg
[npm-curi-react-curious]: https://npmjs.com/package/curi-react-curious

[curi-react-active-version-badge]: https://img.shields.io/npm/v/curi-react-active.svg
[npm-curi-react-active]: https://npmjs.com/package/curi-react-active

[curi-react-clickable-version-badge]: https://img.shields.io/npm/v/curi-react-clickable.svg
[npm-curi-react-clickable]: https://npmjs.com/package/curi-react-clickable
