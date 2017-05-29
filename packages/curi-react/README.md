# curi-react

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-react.svg
[npm-link]: https://npmjs.com/package/curi-react

`curi-react` provides a number of components to create a React appliation that uses the `curi` package to manage routing. This is in part inspired by React Router, but takes a "flat" approach to rendering components. Instead of nesting route components, only the component associated with the best-matched route will be attached to the response.

## Installation

```
npm install --save curi-react
```

### UMD

```html
<script src="https://unpkg.com/curi-react@0.6.3/umd/curi-react.js"></script>
<script type="text/javascript">
  const { Navigator, Link, Block, Redirect} = window.CuriReact;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most
up to date version of the `curi` UMD build, open https://unpkg.com/curi-react/umd in your
browser and copy the link address for the `curi-react.js` file. That will provide you
with the URI of the most recent release. There is also a minimized version of the bundle
if you change the file name in the URI to `curi-react.min.js`.

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.


## Components

`curi-react` is a collection of components that all work in a React web application.

* [`<Navigator>`](../curi-react-navigator)
* [`<Link>`](../curi-react-link)
* [`<Redirect>`](../curi-react-redirect)
* [`<Block>`](../curi-react-block)
* [`curious()`](../curi-react-curious)
* [`<Active>`](../curi-react-active)

## Examples

Please check out the [experiments](../curi-experiments) for examples of `curi-react` in action.

## Overview

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import createConfig from 'curi';
import { Navigator } from 'curi-react';

// some route components
const Home = () => <div>Home</div>;
const Contact = () => <div>Contact</div>;
const NotFound = () => <div>404</div>;

const history = createBrowserHistory();
const routes = [
  { name: 'Home', path: path(''), value: Home },
  { name: 'Contact', path: path('contact'), value: Contact }
];

const config = createConfig(history, routes);
// make sure that the initial location has resolved before rendering
ReactDOM.render((
  <Navigator config={config}>
    {(response, config) => {
      if (!response) {
        return null;
      }
      return response.body
        ? <response.body />
        : <NotFound />;
    }}
  </Navigator>
), document.getElementById('root'))
```
