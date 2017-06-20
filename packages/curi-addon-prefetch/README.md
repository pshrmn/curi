# curi-addon-prefetch

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-addon-prefetch.svg
[npm-link]: https://npmjs.com/package/curi-addon-prefetch

The prefetch addon enables you to run a `uri`'s `load` function prior to actually navigating to that location. This is only useful for in-app navigation. If the user uses the browser's forward/back buttons, the loading will be handled within the Curi configuration object.

**Note:** If you use this addon, then your `load` functions should be caching the data. This is because the route's `load` function is always called when generating a response, effectively making a duplicate call.

## Installation

```js
npm install --save curi-addon-prefetch
```

### Script

If you wish to use `curi-addon-prefetch` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi-addon-prefetch@0.1.0/dist/curi-addon-prefetch.js"></script>
<script type="text/javascript">
  const prefetch = window.CuriAddonPrefetch;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi-addon-prefetch` script build, open https://unpkg.com/curi-addon-prefetch/script in your browser and copy the link address for the `curi-addon-prefetch.js` file. That will provide you with the URI of the most recent release.

## Usage

```js
import createConfig from 'curi';
import prefetch from 'curi-addon-prefetch';

const history = ...;
const routes = [...];

const conf = createConfig(history, routes, { addons: [prefetch] });

// call a route's load function manually
conf.addons.prefetch('User', { id: 2 })
  .then(() => {
    // do something once the data is loaded
  })
```

This addon will only register routes that have a `load` function in their `load` object.

```js
// will register
{
  name: 'User',
  path: 'user/:id',
  load: (params) => {
    if (Store.has(params.id)) {
      return;
    }
    // fetch and store the data
    return fetch(`/api/user/${params.id}`)
      .then(resp => resp.json())
      .then(data => {
        Store.save(data);
      });
  }
}

// will NOT register
{
  name: 'User',
  path: 'user/:id'
}
{
  name: 'User',
  path: 'user/:id',
  preload: () => {
    return import('./components/User').then(resp => resp.default)
  }
}
```
