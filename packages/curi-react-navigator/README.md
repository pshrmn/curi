# curi-react-navigator

## Installation

```
npm install --save curi-react-navigator
```

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
