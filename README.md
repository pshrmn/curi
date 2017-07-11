# Curi [![Travis][build-badge]][build]

Curi lets you create a simple, configurable routing object to render your single-page application. Please check out the [documentation website](https://pshrmn.github.io/curi/) for more information.

Curi is not React specific, but it does come with a number of [React packages](#react) that you can use to integrate Curi into a React application.

You can read more about the design goals of Curi [here](DESIGN_GOALS.md).

### Learn

Just getting started? Please check out these [Curi guides](https://pshrmn.github.io/curi/guides/getting-started/).

<!--For a reference to some of the terms used with Curi, please see the [glossary](./docs/GLOSSARY.md)-->

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
  * [curi-addon-ancestors](#curi-addon-ancestors)
* [Side Effects](#side-effects)
  * [curi-side-effect-title](#curi-side-effect-title)
  * [curi-side-effect-scroll](#curi-side-effect-scroll)
* [React](#react)
  * [curi-react](#curi-react)
  * [curi-react-navigator](#curi-react-navigator)
  * [curi-react-link](#curi-react-link)
  * [curi-react-block](#curi-react-block)
  * [curi-react-redirect](#curi-react-redirect)
  * [curi-react-curious](#curi-react-curious)
  * [curi-react-active](#curi-react-active)
* [Vue](#curi-vue)

## curi

[![npm][curi-version-badge]][npm-curi]

[package](/packages/curi) + [source](/packages/curi/src) + [documentation](https://pshrmn.github.io/curi/packages/curi/)

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

[source](/packages/curi/src/addons/pathname.js)

The `pathname` addon is always used, so you do not need to install it separately.

#### `curi-addon-prefetch`

[![npm][curi-addon-prefetch-version-badge]][npm-curi-addon-prefetch]

[package](/packages/curi-addon-prefetch) + [source](/packages/curi-addon-prefetch/src/index.js) + [documentation](https://pshrmn.github.io/curi/packages/curi-addon-prefetch/)

The `prefetch` addon allows you to call a route's `load` function outside of navigation. If you use this, your `load` function should have a caching mechanism to prevent duplicate data fetches because the `load` function will be called again during actual navigation.

#### `curi-addon-active`

[![npm][curi-addon-active-version-badge]][npm-curi-addon-active]

[package](/packages/curi-addon-active) + [source](/packages/curi-addon-active/src/index.js) + [documentation](https://pshrmn.github.io/curi/packages/curi-addon-active/)

The `active` addon allows you to determine if a route is "active" (its `name`/`params` match the current response's `name`/`params`).. This can be useful for giving an element a specific style when it is "active".

#### `curi-addon-ancestors`

[![npm][curi-addon-ancestors-version-badge]][npm-curi-addon-ancestors]

[package](/packages/curi-addon-ancestors) + [source](/packages/curi-addon-ancestors/src/index.js) + [documentation](https://pshrmn.github.io/curi/packages/curi-addon-ancestors/)

The `ancestors` addon allows you to get the names of ancestor routes for a particular route. You can either get the ancestor at a specific level (the parent route is 1 level up, the gradnparent route is 2, etc.) or you can get a list of all ancestor routes (the list is ordered from furthest to closest).

## Side Effects

#### `curi-side-effect-title`

[![npm][curi-side-effect-title-version-badge]][npm-curi-side-effect-title]

[package](/packages/curi-side-effect-title) + [source](/packages/curi-side-effect-title/src/index.js) + [documentation](https://pshrmn.github.io/curi/packages/curi-side-effect-title/)

The `title` side effect exports a side effect factory. The factory returns a function that will use a response object's `title` property to set `document.title`.

#### `curi-side-effect-scroll`

[![npm][curi-side-effect-scroll-version-badge]][npm-curi-side-effect-scroll]

[package](/packages/curi-side-effect-scroll) + [source](/packages/curi-side-effect-scroll/src/index.js) + [documentation](https://pshrmn.github.io/curi/packages/curi-side-effect-scroll/)

The `scroll` side effect exports a side effect factory. The factory returns a function that will scroll to the top of the page when you push/replace a location, but will let the browser restore the scroll location when popping (forward/back buttons) to a location.

## React

Curi isn't limited to use with React, but it works well with React. These are some "official" Curi packages that help with creating a Curi/React application.

#### `curi-react`

[![npm][curi-react-version-badge]][npm-curi-react]

[package](/packages/curi-react) + [source](/packages/curi-react/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-react/)

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

[package](/packages/curi-react-navigator) + [source](/packages/curi-react-navigator/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-react-navigator/)

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

[package](/packages/curi-react-link) + [source](/packages/curi-react-link/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-react-link/)

A component that uses route names to create HTML anchors for navigation within an application.

```js
<Link to='Home'>Home</Link>
```

#### `curi-react-block`

[![npm][curi-react-block-version-badge]][npm-curi-react-block]

[package](/packages/curi-react-block) + [source](/packages/curi-react-block/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-react-block/)

A component that will give the user the opportunity to cancel navigation when some conditions are met.

#### `curi-react-redirect`

[![npm][curi-react-redirect-version-badge]][npm-curi-react-redirect]

[package](/packages/curi-react-redirect) + [source](/packages/curi-react-redirect/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-react-redirect/)

A component that will automatically cause navigation when it is rendered.

#### `curi-react-curious`

[![npm][curi-react-curious-version-badge]][npm-curi-react-curious]

[package](/packages/curi-react-curious) + [source](/packages/curi-react-curious/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-react-curious/)

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

[package](/packages/curi-react-active) + [source](/packages/curi-react-active/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-react-active/)

A component that modifies its `children` element when its `name` matches the current response's `name`. This component relies on the `curi-addon-active` addon.

```js
// when the response matches the <Active> component's props, the
// <div> will have its props modified by the merge function.
<Active name='Album' params={{ albumId: 7 }} merge={merge}>
  <div>...</div>
</Active>
```

## `curi-vue`

[![npm][curi-vue-version-badge]][npm-curi-vue]

[package](/packages/curi-vue) + [source](/packages/curi-vue/src) + [documentation](https://pshrmn.github.io/curi/packages/curi-vue/)

A Vue plugin that adds Curi routing support to a Vue application. This is currently experimental and in addition to the plugin, just adds `<Link>` and `<Redirect>` components. So far it seems to work well, but is missing a lot of the functionality that the React packages provide.

[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg
[build]: https://travis-ci.org/pshrmn/curi

[curi-version-badge]: https://img.shields.io/npm/v/curi.svg
[npm-curi]: https://npmjs.com/package/curi

[curi-addon-prefetch-version-badge]: https://img.shields.io/npm/v/curi-addon-prefetch.svg
[npm-curi-addon-prefetch]: https://npmjs.com/package/curi-addon-prefetch

[curi-addon-active-version-badge]: https://img.shields.io/npm/v/curi-addon-active.svg
[npm-curi-addon-active]: https://npmjs.com/package/curi-addon-active

[curi-addon-ancestors-version-badge]: https://img.shields.io/npm/v/curi-addon-ancestors.svg
[npm-curi-addon-ancestors]: https://npmjs.com/package/curi-addon-ancestors

[curi-side-effect-title-version-badge]: https://img.shields.io/npm/v/curi-side-effect-title.svg
[npm-curi-side-effect-title]: https://npmjs.com/package/curi-side-effect-title

[curi-side-effect-scroll-version-badge]: https://img.shields.io/npm/v/curi-side-effect-scroll.svg
[npm-curi-side-effect-scroll]: https://npmjs.com/package/curi-side-effect-scroll

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

[curi-vue-version-badge]: https://img.shields.io/npm/v/curi-vue.svg
[npm-curi-vue]: https://npmjs.com/package/curi-vue