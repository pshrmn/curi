# Curi [![Travis][build-badge]][build]

Curi lets you create a simple, configurable routing object to render your single-page application. Please check out the [documentation website](https://curi.js.org/) for more information.

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

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/core](/packages/core)|[![npm][@curi/version-badge]][npm-curi]|[Documentation](https://curi.js.org/packages/@curi/curi/)|[Source](/packages/core/src)|
||The core package provides the core routing functionality for the application. It is used to create a configuration object using a `history` object and a `routes` array.|

#### Addons:

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/addon-active](/packages/addons/addon-active)|[![npm][@curi/addon-active-version-badge]][npm-@curi/addon-active]|[Documentation](https://curi.js.org/packages/@curi/addon-active/)|[Source](/packages/addons/addon-active/src/index.js)|
||The `active` addon allows you to determine if a route is "active" (its `name`/`params` match the current response's `name`/`params`).. This can be useful for giving an element a specific style when it is "active".|
|[@curi/addon-ancestors](/packages/addons/addon-ancestors)|[![npm][@curi/addon-ancestors-version-badge]][npm-@curi/addon-ancestors]|[Documentation](https://curi.js.org/packages/@curi/addon-ancestors/)|[Source](/packages/addons/addon-ancestors/src/index.js)|
||The `ancestors` addon allows you to get the names of ancestor routes for a particular route. You can either get the ancestor at a specific level (the parent route is 1 level up, the gradnparent route is 2, etc.) or you can get a list of all ancestor routes (the list is ordered from furthest to closest).|

#### Side Effects:

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/side-effect-title](/packages/side-effects/side-effect-title)|[![npm][@curi/side-effect-title-version-badge]][npm-@curi/side-effect-title]|[Documentation](https://curi.js.org/packages/@curi/side-effect-title/)|[Source](/packages/side-effects/side-effect-title/src/index.js)|
||The `title` side effect exports a side effect factory. The factory returns a function that will use a response object's `title` property to set `document.title`.|
|[@curi/side-effect-scroll](/packages/side-effects/side-effect-scroll)|[![npm][@curi/side-effect-scroll-version-badge]][npm-@curi/side-effect-scroll]|[Documentation](https://curi.js.org/packages/@curi/side-effect-scroll/)|[Source](/packages/side-effects/side-effect-scroll/src/index.js)|
||The `scroll` side effect exports a side effect factory. The factory returns a function that will scroll to the top of the page when you push/replace a location, but will let the browser restore the scroll location when popping (forward/back buttons) to a location.|

#### Renderers

While you can use vanilla JavaScript to render your application, most modern apps use a rendering library. Currently, there are Curi integrations for React, Vue, and Svelte, but Curi is rendered agnostic and should work with most rendering libraries.

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/react](/packages/react)|[![npm][@curi/react-version-badge]][npm-@curi/react]|[Documentation](https://curi.js.org/packages/@curi/react/)|[Source](/packages/react/src)|
||`@curi/react` provides a communication layer between the `curi` configuration object and your React application.|
|[@curi/redux](/packages/redux)|[![npm][@curi/redux-version-badge]][npm-@curi/redux]|[Documentation](https://curi.js.org/packages/@curi/redux/)|[Source](/packages/redux/src)|
||A complement to `@curi/react`, `@curi/redux` can be used to have Redux pass response/location information to your components.|
|[@curi/vue](/packages/vue)|[![npm][@curi/vue-version-badge]][npm-@curi/vue]|[Documentation](https://curi.js.org/packages/@curi/vue/)|[Source](/packages/vue/src)|
||A Vue plugin that adds Curi routing support to a Vue application. This is currently experimental and in addition to the plugin, just adds `<Link>` and `<Redirect>` components. So far it seems to work well, but is missing a lot of the functionality that the React packages provide.|
|[@curi/svelte](/packages/svelte)|[![npm][@curi/svelte-version-badge]][npm-@curi/svelte]|[Documentation](https://curi.js.org/packages/@curi/svelte/)|[Source](/packages/svelte/src)|

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
