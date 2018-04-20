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
|[@curi/core](/packages/core)|[![npm][@curi/core-version-badge]][npm-@curi/core]|[Documentation](https://curi.js.org/packages/@curi/curi/)|[Source](/packages/core/src)|
||The core package provides the core routing functionality for the application. It is used to create a configuration object using a `history` object and a `routes` array.|

#### Route Interactions:

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/route-active](/packages/interactions/route-active)|[![npm][@curi/route-active-version-badge]][npm-@curi/route-active]|[Documentation](https://curi.js.org/packages/@curi/addon-active/)|[Source](/packages/interactions/route-active/src)|
||The `active` route interaction allows you to determine if a route is "active" (its `name`/`params` match the current response's `name`/`params`).. This can be useful for giving an element a specific style when it is "active".|
|[@curi/route-ancestors](/packages/interactions/route-ancestors)|[![npm][@curi/route-ancestors-version-badge]][npm-@curi/route-ancestors]|[Documentation](https://curi.js.org/packages/@curi/route-ancestors/)|[Source](/packages/interactions/route-ancestors/src)|
||The `ancestors` route interaction allows you to get the names of ancestor routes for a particular route. You can either get the ancestor at a specific level (the parent route is 1 level up, the gradnparent route is 2, etc.) or you can get a list of all ancestor routes (the list is ordered from furthest to closest).|
|[@curi/route-prefetch](/packages/interactions/route-prefetch)|[![npm][@curi/route-prefetch-version-badge]][npm-@curi/route-prefetch]|[Documentation](https://curi.js.org/packages/@curi/addon-prefetch/)|[Source](/packages/interactions/route-prefetch/src)|
||The `prefetch` route interaction allows you to call a route's `on.every()` function early so you can cache its data before a request for that route is actually made.|

#### Side Effects:

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/side-effect-title](/packages/side-effects/side-effect-title)|[![npm][@curi/side-effect-title-version-badge]][npm-@curi/side-effect-title]|[Documentation](https://curi.js.org/packages/@curi/side-effect-title/)|[Source](/packages/side-effects/side-effect-title/src)|
||The `title` side effect exports a side effect factory. The factory returns a function that will use a response object's `title` property to set `document.title`.|
|[@curi/side-effect-scroll](/packages/side-effects/side-effect-scroll)|[![npm][@curi/side-effect-scroll-version-badge]][npm-@curi/side-effect-scroll]|[Documentation](https://curi.js.org/packages/@curi/side-effect-scroll/)|[Source](/packages/side-effects/side-effect-scroll/src)|
||The `scroll` side effect exports a side effect factory. The factory returns a function that will scroll to the top of the page when you push/replace a location, but will let the browser restore the scroll location when popping (forward/back buttons) to a location.|

#### Renderers

While you can use vanilla JavaScript to render your application, most modern apps use a rendering library. Currently, there are Curi integrations for React, Vue, and Svelte, but Curi is rendered agnostic and should work with most rendering libraries.

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/react](/packages/react)|[![npm][@curi/react-version-badge]][npm-@curi/react]|[Documentation](https://curi.js.org/packages/@curi/react/)|[Source](/packages/react/src)|
||`@curi/react` provides a communication layer between the `curi` configuration object and your React application.|
|[@curi/vue](/packages/vue)|[![npm][@curi/vue-version-badge]][npm-@curi/vue]|[Documentation](https://curi.js.org/packages/@curi/vue/)|[Source](/packages/vue/src)|
||A Vue plugin that adds Curi routing support to a Vue application. This is currently experimental and in addition to the plugin, just adds `<Link>` and `<Redirect>` components. So far it seems to work well, but is missing a lot of the functionality that the React packages provide.|
|[@curi/svelte](/packages/svelte)|[![npm][@curi/svelte-version-badge]][npm-@curi/svelte]|[Documentation](https://curi.js.org/packages/@curi/svelte/)|[Source](/packages/svelte/src)|
|[@curi/react-native](/packages/react-native)|[![npm][@curi/react-native-version-badge]][npm-@curi/react-native]|[Documentation](https://curi.js.org/packages/@curi/react-native/)|[Source](/packages/react-native/src)|
||`@curi/react` provides a communication layer between the `curi` configuration object and your React application.|

#### State

|Name|About|Documentation|Source|
|---|---|---|---|
|[@curi/redux](/packages/redux)|[![npm][@curi/redux-version-badge]][npm-@curi/redux]|[Documentation](https://curi.js.org/packages/@curi/redux/)|[Source](/packages/redux/src)|
||A complement to `@curi/react`, `@curi/redux` can be used to have Redux pass response/location information to your components.|
|[@curi/mobx](/packages/mobx)|[![npm][@curi/mobx-version-badge]][npm-@curi/mobx]|[Documentation](https://curi.js.org/packages/@curi/mobx/)|[Source](/packages/mobx/src)|
||A complement to `@curi/react`, `@curi/mobx` can be used to have MobX pass response/location information to your components.|

[build-badge]: https://img.shields.io/travis/pshrmn/curi/master.svg
[build]: https://travis-ci.org/pshrmn/curi

[@curi/core-version-badge]: https://img.shields.io/npm/v/@curi/core.svg
[npm-@curi/core]: https://npmjs.com/package/@curi/core

[@curi/route-prefetch-version-badge]: https://img.shields.io/npm/v/@curi/route-prefetch.svg
[npm-@curi/route-prefetch]: https://npmjs.com/package/@curi/route-prefetch

[@curi/route-active-version-badge]: https://img.shields.io/npm/v/@curi/route-active.svg
[npm-@curi/route-active]: https://npmjs.com/package/@curi/route-active

[@curi/route-ancestors-version-badge]: https://img.shields.io/npm/v/@curi/route-ancestors.svg
[npm-@curi/route-ancestors]: https://npmjs.com/package/@curi/route-ancestors

[@curi/side-effect-title-version-badge]: https://img.shields.io/npm/v/@curi/side-effect-title.svg
[npm-@curi/side-effect-title]: https://npmjs.com/package/@curi/side-effect-title

[@curi/side-effect-scroll-version-badge]: https://img.shields.io/npm/v/@curi/side-effect-scroll.svg
[npm-@curi/side-effect-scroll]: https://npmjs.com/package/@curi/side-effect-scroll

[@curi/react-version-badge]: https://img.shields.io/npm/v/@curi/react.svg
[npm-@curi/react]: https://npmjs.com/package/@curi/react

[@curi/react-native-version-badge]: https://img.shields.io/npm/v/@curi/react-native.svg
[npm-@curi/react-native]: https://npmjs.com/package/@curi/react-native

[@curi/vue-version-badge]: https://img.shields.io/npm/v/@curi/vue.svg
[npm-@curi/vue]: https://npmjs.com/package/@curi/vue

[@curi/svelte-version-badge]: https://img.shields.io/npm/v/@curi/svelte.svg
[npm-@curi/svelte]: https://npmjs.com/package/@curi/svelte

[@curi/redux-version-badge]: https://img.shields.io/npm/v/@curi/redux.svg
[npm-@curi/redux]: https://npmjs.com/package/@curi/redux

[@curi/mobx-version-badge]: https://img.shields.io/npm/v/@curi/mobx.svg
[npm-@curi/mobx]: https://npmjs.com/package/@curi/mobx
