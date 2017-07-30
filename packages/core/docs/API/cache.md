# Cache

The `cache` option allows you to save `response` objects. The actual caching mechanism is left up to you. It only has two requirements:

1. It provides a `set` function which receives a `response` object as its argument.
2. It provides a `get` function which receives a `location` object as its argument and returns a `response` object associated with the location (if one exists)

```js
const createSimpleCache = () => {
  const cache = {};

  return {
    get: location => {
      const { key } = location;
      return cache[key];
    },
    set: response => {
      const { key } = response.location;
      cache[key] = response;
    }
  };
}

const myCache = createSimpleCache();

const config = createConfig(history, routes, { cache: myCache });
```

The above cache uses a location's `key` property to store values. This is really only useful for dealing with reusing responses when the user uses the browser's forward/back buttons.

Alternatively, you might create a `cache` that can cache responses based on the location's `pathname` or possibly by concatenating the `pathname`, `search`, and `hash` strings. What you choose is really up to you.

### With Hash History

If you are using a hash history, you will not be able to use `location.key` for caching responses. That is because hash history locations do not have `key` properties.
