# Prefetching data

**Note:** This is temporarily "out of order" until the `<PrefetchLink>` is fully implemented (which will be available through the `curi-react-prefetch-link` package). The current code functions, but it does not work as intended (data is being loaded while navigating instead of before navigating).

[CodeSandbox demo](https://codesandbox.io/embed/48WlgnyGg)

**You probably don't need this because data is already loaded before navigation occurs.**

The only thing that this really does is prevent the URI in the address bar from changing until after the data has been loaded. If that is something that you want, then you will have to do the following things:

1. Include the `prefetch` addon in your configuration object.

```js
import prefetchAddon from 'curi-addon-prefetch';

const config = createConfig(history, routes, { addons: [prefetchAddon] });
```

2. In your `load` function, you will need to cache reults. This is because while the config object is creating a response, there isn't anything that actually indicates that the route has been prefetched.

```js
const routes = [
  {
    name: 'Some Page',
    path: 'some/page/:id'
    load: (resp) => {
      const { params } = resp;
      if (cache[params.id]) {
        return Promise.resolve(cache[params.id]);
      }
      return fetch(`/api//some/page/${params.id}`)
        .then(data => {
          cache[params.id] = data;
          return data;
        });
    }
  }
];
```

3. Use the `prefetch` property of a `<Link>` to ensure that it does not push the new location until after the `load` function has resolved.

```js
<Link prefetch name='Some Page' params={{ id: 6 }}>Page 6</Link>
```
