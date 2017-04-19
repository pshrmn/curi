# Promises and curi

curi's response generation is Promise based. If you are unfamiliar with Promises, a very basic overview of promises is provided [below](#very-basic-promise-overview)

Routes can have `preload` and `load` functions that are expected to return Promises. The `preload` function is useful for code splitting and the `load` function is where you would load data before rendering and possibly redirect.

When `curi` matches a route, it will wait until the matched route's `preload` and `load` (_if_ they exist) functions have resolved before calling any subscribed functions. Even if those properties do not exist, the response generation will still be asynchronous.

Because the Promises are asynchronous, it is not guaranteed that the initial response will have resolved before you call `config.subscribe`. To deal with this, the config object has a `ready` method. All that `ready` does is return a Promise that will resolve onces the initial response is ready.

You can pass a function to the `then` method of the Promise returned by `config.then` and it will be called once the initial response has resolved. Your function will be passed the response object.

```js
const config = createConfig(history, routes);
config.ready()
  .then(initialResponse => {
    // now it is safe to subscribe or do something with the response
  })
  .catch(err => {
    // unless there was an error in creating the response, in which case
    // you need to handle that.
  });
```

### Very Basic Promise Overview

The most basic thing to know is that a Promise has a `then` property.

```js
const prom = new Promise((resolve, reject) => { resolve('Okay'); });
// typeof prom.then === 'function'
```

The `then` property is a function that takes another function as its argument. That function will be called when the Promise has "resolved" (unless an error occured, in which case the Promise's `catch` function is called).

```js
prom
  .then(data => {
    // prom resolved and returned data, which is the string 'Okay'
  })
  .catch(err => {
    // if either prom or the above function passed to then
    // throw an error, this function will be called
  });
```

For more/better information about Promises, these two articles should help you out: [JavaScript Promise API](https://davidwalsh.name/promises) and [MDN's Promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
