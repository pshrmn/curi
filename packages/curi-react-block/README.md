# curi-react-block

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-react-block.svg
[npm-link]: https://npmjs.com/package/curi-react-block

## Installation

```js
npm install --save curi-react-block
```

### Script

If you wish to use `curi-react-block` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi-react-block@0.2.0/dist/curi-react-block.js"></script>
<script type="text/javascript">
  const Block = window.CuriReactBlock;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi-react-block` script build, open https://unpkg.com/curi-react-block/dist in your browser and copy the link address for the `curi-react-block.js` file. That will provide you with the URI of the most recent release.

**Note:** If you are using the above script, you will have to include `react` and `prop-types` scripts yourself.

## `<Block>`

Render a `<Block>` component when you want to have a user confirm navigation.

When navigation occurs (and the `when` prop is `true`), the `confirm` prop will be called and navigation will only happen if that function calls its `success` function that it is passed.

**Note:** Navigation done using the browser's forward/back buttons is not caught until _after_ the navigation occurs. This means that the URI in the address bar will be the next location, but if the user cancels navigation, the URI will revert to the current location.

```js
<Block confirm={confirmFunction} />
```

### props

#### `when`

A boolean, which is `true` by default. When it is `true`, the navigation block is active. When `when` is `false`, navigation will not be blocked.

```js
// will block navigation
<Block when={true} confirm={confirm} />

// will not block navigation
<Block when={false} confirm={confirm} />
```

#### `confirm`

The `confirm` prop is a function that will be called whenever there is navigation. The function will receive four arguments: `location`, `action`, `success`, and `failure`. The `location` and `action` values are the location object that is being navigated to and the type of navigation. The `success` and `failure` arguments are functions that you should call depending on whether or not you want to let the navigation happen. When the navigation should occur, the `confirm` function should call the `success` function. When the navigation should be cancelled, the `failure` function should be called.

```js
<Block
  confirm={(location, action, success, failure) => {
    const response = window.confirm("Shall we?");
    if (response) {
      success();
    } else {
      failure();
    }
  }}
/>
```
