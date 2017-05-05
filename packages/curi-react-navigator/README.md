# curi-react-navigator

## Installation

```
npm install --save curi-react-navigator
```

### UMD

```html
<script src="https://unpkg.com/curi-react-navigator@0.1.0/umd/curi-react-navigator.js"></script>
<!-- there is also a min script: curi-react-navigator.min.js -->
<script type="text/javascript">
  const Navigator = window.CuriReactNavigator;
</script>
```

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.

## `<Navigator>`

The `<Navigator>` component provides a way to automatically update your application when the location changes. This component gets passed a `curi` config object, which it will subscribe to so that it can re-render when the location changes.

```js
const config = createConfig(history, routes);
config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config}>
      {(response, config) => {
        return response.body ? <response.body /> : null
      }}
    </Navigator>
  ), holder);
});
```

### props

#### `config`

A configuration object (created by calling `curi`'s `createConfig` function).

#### `children`

A render function. This will be called whenever the `<Navigator>` renders. The function will be passed the current response object and the `config` object it was passed as a prop.
