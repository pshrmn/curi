# curi-react-navigator

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-react-navigator.svg
[npm-link]: https://npmjs.com/package/curi-react-navigator

## Installation

```
npm install --save curi-react-navigator
```

### Script

If you wish to use `curi-react-navigator` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi-react-navigator@0.2.0/dist/curi-react-navigator.js"></script>
<script type="text/javascript">
  const Navigator = window.CuriReactNavigator;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi-react-navigator` script build, open https://unpkg.com/curi-react-navigator/dist in your browser and copy the link address for the `curi-react-navigator.js` file. That will provide you with the URI of the most recent release.

**Note:** If you are using the above script, you will have to include `react` and `prop-types` scripts yourself.

## `<Navigator>`

The `<Navigator>` component provides a way to automatically update your application when the location changes. This component gets passed a `curi` config object, which it will subscribe to so that it can re-render when the location changes.

```js
const config = createConfig(history, routes);

ReactDOM.render((
  <Navigator config={config}>
    {(response, config) => {
      if (!response) {
        return null;
      }
      return response.body ? <response.body /> : null;
    }}
  </Navigator>
), holder);
```

### props

#### `config`

A configuration object (created by calling `curi`'s `createConfig` function).

#### `children`

A render function. This will be called whenever the `<Navigator>` renders. The function will be passed the current response object and the `config` object it was passed as a prop.
