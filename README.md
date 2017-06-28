# Curi [![Travis][build-badge]][build]

Curi lets you create a simple, configurable routing object to render your single-page application. Curi uses [addons](./docs/tutorials/03-curi-addons.md) and [middleware](./docs/tutorials/04-curi-middleware.md) to customize how you render your application.

Curi is not React specific, but it does come with a number of [React packages](#react) that you can use to integrate Curi into a React application.

You can read more about the design goals of Curi [here](DESIGN_GOALS.md).

### Learn

Just getting started? Please check out these [Curi tutorials](./docs/tutorials). Alternatively, there is a general introduction to Curi that you can read [on Medium](https://medium.com/@pshrmn/route-with-curi-221237ba71d8).

For a reference to some of the terms used with Curi, please see the [glossary](./docs/GLOSSARY.md)

### Examples

You can test Curi out with these small demos:
* [CodeSandbox](https://codesandbox.io/embed/gLX5W2gvj)
* [CodePen](https://codepen.io/pshrmn/pen/mmebOK)

There are also a number of [examples](/examples) that you can learn from. Many of these provide links to CodeSandbox demos so that you can test them in your browser.

### Packages:
* [curi](#curi)
* [Addons](#addons)
  * [pathname (built-in)](#pathname)
  * [curi-addon-prefetch](#curi-addon-prefetch)
  * [curi-addon-active](#curi-addon-active)
* [Middleware](#middleware)
  * [curi-middleware-query](#curi-middleware-query)
  * [curi-middleware-title](#curi-middleware-title)
* [React](#react)
  * [curi-react](#curi-react)
  * [curi-react-navigator](#curi-react-navigator)
  * [curi-react-link](#curi-react-link)
  * [curi-react-block](#curi-react-block)
  * [curi-react-redirect](#curi-react-redirect)
  * [curi-react-curious](#curi-react-curious)
  * [curi-react-active](#curi-react-active)

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
    body: () => Home,
  },
  {
    name: 'About',
    path: 'about',
    preload: () => {
      return import('./components/About')
        .then(module => { store.register('About', module.default); });
    }
    body: () => store.get('About')
  }
];
```

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

#### `curi-middleware-title`

[![npm][curi-middleware-title-version-badge]][npm-curi-middleware-title]

[package](/packages/curi-middleware-title) + [source](/packages/curi-middleware-title/src/index.js) + [documentation](/packages/curi-middleware-title/README.md#usage)

The `title` middleware exports a middleware factory. The factory returns a function that will use a response object's `title` property to set `document.title`.

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
