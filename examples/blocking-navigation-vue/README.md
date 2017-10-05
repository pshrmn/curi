# Blocking navigation

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/blocking-navigation)

Sometimes, you don't want the user to leave the page. Ideally, this is for their own good, such as when a form is half filled out, and not becacuse you're running a spam site.

When you want to do this, you can use the `<Block>` component from `react-curi` to display a user confirmation that requires user input before navigation will occur.

```js
class MyView extends React.Component {
  
  // ...

  render() {
    const { form } = this.state;
    return (
      <div>
        <Block when={form.isDirty} message='Are you sure?' />
        <form>
          // ...
        </form>
      </div>
    );
  }
}
```

By default, this will be `window.confirm`, but you can create your own by passing a `getUserConfirmation` option when you create your `history` instance.

```js
const myHistory = createBrowserHistory({
  getUserConfirmation: myCustomConfirmationFunction
});
```
