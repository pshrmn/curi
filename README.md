# Curi [![Travis][build-badge]][build]

Curi lets you create a simple, configurable routing object to render your single-page application. Please check out the [documentation website](https://curi.js.org/) for more information.

```js
import Browser from '@hickory/browser';
import createConfig from '@curi/core';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi configuration object
const config = createConfig(history, routes);

// wait for the first response to be generated
config.ready().then((response) => {
  // and now, you're ready to render
});
```

Curi is not React specific, but it currently has the best support for React with the [`@curi/react` package](#react).

You can read more about the design goals of Curi [here](DESIGN_GOALS.md).

### Learn

Just getting started? Please check out these [Curi guides](https://curi.js.org/guides/getting-started/).

<!--For a reference to some of the terms used with Curi, please see the [glossary](./docs/GLOSSARY.md)-->

### Examples

You can test Curi out with these small demos:
* [CodeSandbox](https://codesandbox.io/embed/gLX5W2gvj)
* [CodePen](https://codepen.io/pshrmn/pen/mmebOK)

There are also a number of [examples](/examples) that you can learn from. Many of these provide links to CodeSandbox demos so that you can test them in your browser.

### Packages:
* [@curi/core](#curicore)
* [Addons](#addons)
  * [pathname (built-in)](#pathname)
  * [@curi/addon-prefetch](#curiaddon-prefetch)
  * [@curi/addon-active](#curiaddon-active)
  * [@curi/addon-ancestors](#curiaddon-ancestors)
* [Side Effects](#side-effects)
  * [@curi/side-effect-title](#curiside-effect-title)
  * [@curi/side-effect-scroll](#curiside-effect-scroll)
* [Renderers](#renderers)
  * [React](#curireact)
  * [Vue](#curivue)
  * [Svelte](#curisvelte)

## @curi/core

[![npm][@curi/version-badge]][npm-curi]

[package](/packages/core) + [source](/packages/core/src) + [documentation](https://curi.js.org/packages/@curi/curi/)

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

#### `@curi/addon-prefetch`

[![npm][@curi/addon-prefetch-version-badge]][npm-@curi/addon-prefetch]

[package](/packages/addons/addon-prefetch) + [source](/packages/addons/addon-prefetch/src/index.js) + [documentation](https://curi.js.org/packages/@curi/addon-prefetch/)

The `prefetch` addon allows you to call a route's `load` function outside of navigation. If you use this, your `load` function should have a caching mechanism to prevent duplicate data fetches because the `load` function will be called again during actual navigation.

#### `@curi/addon-active`

[![npm][@curi/addon-active-version-badge]][npm-@curi/addon-active]

[package](/packages/addons/addon-active) + [source](/packages/addons/addon-active/src/index.js) + [documentation](https://curi.js.org/packages/@curi/addon-active/)

The `active` addon allows you to determine if a route is "active" (its `name`/`params` match the current response's `name`/`params`).. This can be useful for giving an element a specific style when it is "active".

#### `@curi/addon-ancestors`

[![npm][@curi/addon-ancestors-version-badge]][npm-@curi/addon-ancestors]

[package](/packages/addons/addon-ancestors) + [source](/packages/addons/addon-ancestors/src/index.js) + [documentation](https://curi.js.org/packages/@curi/addon-ancestors/)

The `ancestors` addon allows you to get the names of ancestor routes for a particular route. You can either get the ancestor at a specific level (the parent route is 1 level up, the gradnparent route is 2, etc.) or you can get a list of all ancestor routes (the list is ordered from furthest to closest).

## Side Effects

#### `@curi/side-effect-title`

[![npm][@curi/side-effect-title-version-badge]][npm-@curi/side-effect-title]

[package](/packages/side-effects/side-effect-title) + [source](/packages/side-effects/side-effect-title/src/index.js) + [documentation](https://curi.js.org/packages/@curi/side-effect-title/)

The `title` side effect exports a side effect factory. The factory returns a function that will use a response object's `title` property to set `document.title`.

#### `@curi/side-effect-scroll`

[![npm][@curi/side-effect-scroll-version-badge]][npm-@curi/side-effect-scroll]

[package](/packages/side-effects/side-effect-scroll) + [source](/packages/side-effects/side-effect-scroll/src/index.js) + [documentation](https://curi.js.org/packages/@curi/side-effect-scroll/)

The `scroll` side effect exports a side effect factory. The factory returns a function that will scroll to the top of the page when you push/replace a location, but will let the browser restore the scroll location when popping (forward/back buttons) to a location.

## Renderers

While you can use vanilla JavaScript to render your application, most modern apps use a rendering library. Currently, there are Curi integrations for React, Vue, and Svelte, but Curi is rendered agnostic and should work with most rendering libraries.

#### `@curi/react`

[![npm][@curi/react-version-badge]][npm-@curi/react]

[package](/packages/react) + [source](/packages/react/src) + [documentation](https://curi.js.org/packages/@curi/react/)

`@curi/react` provides a communication layer between the `curi` configuration object and your React application.

#### `@curi/redux`

[![npm][@curi/redux-version-badge]][npm-@curi/redux]

[package](/packages/redux) + [source](/packages/redux/src) + [documentation](https://curi.js.org/packages/@curi/redux/)

A complement to `@curi/react`, `@curi/redux` can be used to have Redux pass response/location information to your components

#### `@curi/vue`

[![npm][@curi/vue-version-badge]][npm-@curi/vue]

[package](/packages/vue) + [source](/packages/vue/src) + [documentation](https://curi.js.org/packages/@curi/vue/)

A Vue plugin that adds Curi routing support to a Vue application. This is currently experimental and in addition to the plugin, just adds `<Link>` and `<Redirect>` components. So far it seems to work well, but is missing a lot of the functionality that the React packages provide.

#### `@curi/svelte`

[![npm][@curi/svelte-version-badge]][npm-@curi/svelte]

[package](/packages/svelte) + [source](/packages/svelte/src) + [documentation](https://curi.js.org/packages/@curi/svelte/)


[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg
[build]: https://travis-ci.org/pshrmn/curi

[@curi/version-badge]: https://img.shields.io/npm/v/curi.svg
[npm-curi]: https://npmjs.com/package/curi

[@curi/addon-prefetch-version-badge]: https://img.shields.io/npm/v/@curi/addon-prefetch.svg
[npm-@curi/addon-prefetch]: https://npmjs.com/package/@curi/addon-prefetch

[@curi/addon-active-version-badge]: https://img.shields.io/npm/v/@curi/addon-active.svg
[npm-@curi/addon-active]: https://npmjs.com/package/@curi/addon-active

[@curi/addon-ancestors-version-badge]: https://img.shields.io/npm/v/@curi/addon-ancestors.svg
[npm-@curi/addon-ancestors]: https://npmjs.com/package/@curi/addon-ancestors

[@curi/side-effect-title-version-badge]: https://img.shields.io/npm/v/@curi/side-effect-title.svg
[npm-@curi/side-effect-title]: https://npmjs.com/package/@curi/side-effect-title

[@curi/side-effect-scroll-version-badge]: https://img.shields.io/npm/v/@curi/side-effect-scroll.svg
[npm-@curi/side-effect-scroll]: https://npmjs.com/package/@curi/side-effect-scroll

[@curi/react-version-badge]: https://img.shields.io/npm/v/@curi/react.svg
[npm-@curi/react]: https://npmjs.com/package/@curi/react

[@curi/redux-version-badge]: https://img.shields.io/npm/v/@curi/redux.svg
[npm-@curi/redux]: https://npmjs.com/package/@curi/redux

[@curi/vue-version-badge]: https://img.shields.io/npm/v/@curi/vue.svg
[npm-@curi/vue]: https://npmjs.com/package/@curi/vue

[@curi/svelte-version-badge]: https://img.shields.io/npm/v/@curi/svelte.svg
[npm-@curi/svelte]: https://npmjs.com/package/@curi/svelte
