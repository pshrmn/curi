# Ready or not

Some example code calls `config.ready()` prior to rendering, while other examples do not. You may be wondering whether or not you need to do so.

Either practice is acceptable, but each comes with its own tradeoffs. The basic gist is that if you use `config.ready`, you can be positive that the innitial response has resolved before you render your application.

### Ready

`config.ready()` returns a Promise that will resolve once the initial response object has been generated. This means that any `load`/`preload` calls from the matched route must have completed before you can render.

The most important use case for `config.ready()` is if you are doing server-side rendering (especially with a React application). When you render a React application on the server, you only render once, using the initial data. This means that you want to ensure that you have everything necessary to render loaded prior to actually rendering. This should be the same for other rendering libraries.

```js
// server
config.ready().then(response => {
  renderToString(
    <Navigator response={response} config={config}>
      {renderFunction}
    </Navigator>
  );
});
```

When you do server-side rendering with a React application, it is important that the initial render on the client-side generates the same markup as the server did. If you skip using `config.ready()` on the client-side, then React will have to regenerate the initial markup.

```js
/// client
config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config}>
      {renderFunction}
    </Navigator>
  ), holder);
});
```

The biggest downside to using `config.ready()` is that you aren't rendering anything until the initial response has been generated. This means that if the `load`/`preload` for the first matched route take some time to run, you will just be rendering a blank screen until they complete.

### Not Ready

You can skip calling `config.ready()` and just immediately render your application.

```js
config.subscribe(response => {
  // render using the response
});
```

The one thing to keep in mind here is that if the initial response has not been generated when you call `config.subscribe()`, then your subscriber function's first call will be passed the argument `undefined`. This means that you will need to handle what to do when the response is `undefined`. You may do nothing or you may want to render a loading view until you can render the initial response.

```js
config.subscribe(response => {
  if (!response) {
    renderLoadingScreen();
    return;
  }
  // render your actual application
  // once you have a response
});
```

## Up to you

Which approach is better? That will largely be up to you. `config.ready()` is definitely necessary if you are building a React application with server-side rendering (and possibly with other libraries as well). If you are only doing client-side rendering, then you just have to decide if/what you want to render prior to the initial response being generated.


