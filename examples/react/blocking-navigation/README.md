# Blocking navigation

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/react/blocking-navigation)

Sometimes, you don't want the user to leave the page. Ideally, this is for their own good, such as when a form is half filled out, and not becacuse you're running a spam site.

When you want to do this, you can use the `useBlock` component from `@curi/react-dom` to display a user confirmation that requires user input before navigation will occur.

```js
function confirm() {...};

function MyView() {
  const [dirty, setDirty] = React.useState(false);
  useBlock(dirty, confirm);
  return (
    <form>
      {/* ... */}
    </form>
  );
}
```

By default, this will be `window.confirm`, but you can create your own by passing a `getUserConfirmation` option when you create your `history` instance.

```js
const myHistory = createBrowserHistory({
  getUserConfirmation: myCustomConfirmationFunction
});
```
