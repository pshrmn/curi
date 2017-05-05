# curi-react-block

## Installation

```js
npm install --save curi-react-block
```

### UMD

```html
<script src="https://unpkg.com/curi-react-block@0.1.0/umd/curi-react-block.js"></script>
<!-- there is also a min script: curi-react-block.min.js -->
<script type="text/javascript">
  const Block = window.CuriReactBlock;
</script>
```

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.

## `<Block>`

Render a `<Block>` component when you want to have a user confirm navigation.

When navigation occurs (and the `when` prop is `true`), your `history` object's `getUserConfirmation` function will be called (this is just `window.prompt` by default). The `history` instance will use the result of the `getUserConfirmation` function to determine if the navigation should occur.

**Note:** Navigation done using the browser's forward/back buttons is not caught until _after_ the navigation occurs. This means that the URI in the address bar will be the next location, but if the user cancels navigation, the URI will revert to the current location.

```js
<Block message='Are you sure you want to leave?' />
```

### props

#### `when`

A boolean, which is `true` by default. When it is `true`, the navigation block is active. When `when` is `false`, navigation will not be blocked.

#### `message`

This is either a string or a function that returns a string.

When it is a string, the string will be the message passed to the `getUserConfirmation` function.

```js
<Block message='Shall we?' />
```

When it is a function, the function will be passed the new `location` object and the `action` string (`POP`, `PUSH`, `REPLACE`). These values can be used to help generate the confirmation message.

```js
<Block message={(location, action) => {
  return `Are you sure you want to go to ${location.pathname}?`;
}} />
```
