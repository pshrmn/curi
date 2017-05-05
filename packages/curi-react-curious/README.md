# curi-react-curious

## Installation

```
npm install --save curi-react-curious
```

### UMD

```html
<script src="https://unpkg.com/curi-react-curious@0.1.0/umd/curi-react-curious.js"></script>
<!-- there is also a min script: curi-react-curious.min.js -->
<script type="text/javascript">
  const curious = window.CuriReactCurious;
</script>
```

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.

## `curious()`

The `curious` higher-order component creates a component that has a `curi` prop. The `curi` prop is your application's configuration object. The primary use case for this would be if you want to access your `history` instance to manually navigate or to call one of your Curi configuration object's addon functions.

```js
const MyButton = curious((props) => {
  const { curi, to, text } = props;
  return (
    <button
     type='button'
      onClick={(e) => {
        e.preventDefault();
        const pathname = curi.addons.pathname(to);
        curi.history.push(pathname);
      }}
    >
      {text}
    </button>
  )
});
```

In order for `curious` to work, it needs to have an ancestor component that places your application's configuration object on React's `context`. If you use the `<Navigator>` component, this will be done for you.

```js
// assuming you have setup your application like this:
const config = createConfig(history, routes);
config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config}>
      {(response, config) => {
        return <App />;
      }}
    </Navigator>
  ), holder);
});

// The <MyButton> (from above) rendered by <App> will have a "curi" prop
// because it is wrapped by the "curious" HOC.
const App = () => (
  <div>
    ...
    <MyButton to='Some Page' text='Go to some other page' />
  </div>
);
```

### wrapper component props

#### `internalRef`

A ref function that you can use to access the wrapped component.

```js
const WrappedComponent = curious(MyComponent);

<WrappedComponent internalRef={node => ref = node} />
```

#### others

Any other props that you pass to the wrapper component (the one created by calling `curious`) will be passed to the wrapped component.

```js
const WrappedComponent = curious(MyComponent);

<WrappedComponent one='two' red='blue' />
// MyComponent's props: { curi: {...}, one: 'two', red: 'blue' }
```
