# Basic Curi + Svelte Example

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/basic-svelte)

A simple Svelte site, this application uses `config.subscribe` to remove the current view and render a new one whenever the location changes.

```js
let view;
let holder = document.getElementById('root');
config.subscribe(response => {
  // remove the current view
  if (view) {
    view.destroy();
  } else {
    holder.innerHTML = '';
  }
  // render the new view
  view = new response.body({
    target: holder,
    data: {
      response
    }
  });
});
```

Svelte does not have a way to implicitly access data from ancestor components (`context` in React or using mixins to attach properties in Vue). Instead, we use the `setConfig` function from `@curi/svelte` to store our Curi configuration object. The `<Link>` can then access that object to properly generate `href`s and navigate.

```js
import { setConfig } from '@curi/svelte';

const config = createConfig(history, routes);
setConfig(config);
```
