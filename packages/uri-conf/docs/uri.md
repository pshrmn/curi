# `uri(name, path, children, load)`

A `uri` describes a location's `pathname` using the `path` argument. Every `uri` must have a **unique** name. The name will be used to interact with the `uri` without direct access to the object.

```js
import uri from 'uri-config/uri';

const home = uri('Home', path('', { end: true }));
```

### Arguments

#### `name`

A unique identifier. This should be a string or a symbol.

#### `path`

An instance of `uri-config/path`. This describes the pathname segments that the `uri` should match. More information about this argument can be seen in the [`path` documentation](./path.md).

#### `children`

An optional array of `uri` objects. Any children `uri`s will be matched relative to their parent `uri`. This means that if a parent `uri`'s path string is `'one'` and a child `uri`'s path string is `'two'`, the child `uri` will match when the pathname is `one/two`.

#### `load`

The `load` object should be used to pass data-loading functions that are related to the `uri`. There are two valid properties of the `load` object: `preload` and `load`. Both functions must return a `Promise`.

1. `preload` will only be called the first time that a `uri` matches. This should only be used for loading resources that are required for the `uri` to display properly. For example, if you are doing code-splitting with Webpack using `require.ensure` or `import()`, you would load them in `preload`.

2. `load` should be used for actual data fetching. The `load` function will be passed the uri data object, which has the properties: `segment`, `uri`, and `params`. The difference between `segment` and `uri` is that `segment` only includes the part of the pathname that this `uri` object matched, whereas `uri` is the matched pathname starting at the root.
