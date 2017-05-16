# route

A route describes a location's `pathname` using the `path` argument. Internally, `curi` will create a `uri` object for every route. 

```js
const home = {
  name: 'Home',
  path: ''
};
```

### Properties

#### `name`

A unique identifier. This should be a string or a symbol.

#### `path`

A `path-to-regexp` style string. This should **not** have a leading slash. The string will be passed to `path-to-regexp` to generate a regular expression. Any [parameters](https://github.com/pillarjs/path-to-regexp#parameters) will be identified so that they can be parsed out when matching against a location's `pathname`.

**Note:** While `path-to-regexp` supports arrays and RegExps, only string paths are supported here. This is because the path must also be reversible to create a pathname given params.

#### `pathOptions`

If you need to provide different path options that [the defaults](https://github.com/pillarjs/path-to-regexp#usage) used by `path-to-regexp`, you should specify them with a `pathOptions` object.

**Note:** If a route has a `children` array property, it will **always** have the `end` path option set to `false`.

#### `value`

When the route is the best match for the current location, this value will be assigned to the response's `render` property. The `value` property` is preferred over the `call` property.

```js
const contact = {
  name: 'Contact',
  path: 'contact',
  value: Contact
};
```

#### `call`

This is a function that will be called when the route is the best match for the current location. The value returned by the function will be assigned to the response's `render` property.

This is useful when the value is not available when creating a config. This would most likely happen when you are using asynchronous module loading (probably in tandem with the `preload` route property).

```js
const about = {
  name: 'About',
  path: 'about',
  call: function() {
    return AsyncStore.get('About');
  }
};
```

#### `children`

An optional array of route objects. Any child routes will be matched relative to their parent route's `path`. This means that if a parent route's path string is `'one'` and a child route's path string is `'two'`, the child will match when the pathname is `one/two`.

**Important Note:** If a route uses the `children` property, you should either create the `path` using the `parentPath` function or use the `{ end: false }` option.

#### `preload`

`preload` will only be called the first time that a `uri` matches. This should only be used for loading resources that are required for the `uri` to display properly. For example, if you are doing code-splitting with Webpack using `require.ensure` or `import()`, you would load them in `preload`.

`preload` must return a `Promise`.

```js
const about = {
  name: 'About',
  path: 'about',
  preload: () => {
    return import('./components/About').then(module => AsyncStore.register(module.default));
  }
};
```

#### `load`

`load` should be used for actual data fetching as well as for triggering redirects. The `load` function will be passed the object or `params` parsed from the location's `pathname` (using the route its ancestor's `path`s) and the `ResponseCreator` object that has been generated for the current location.

```js
const user = {
  name: 'User',
  path: ':id',
  load: (params, resp) => {
    return fetch(`/api/users/${params.id}`)
      .then(data => JSON.parse(data))
      .catch(err => { resp.setStatus(404); });
  }
}
```

Like `preload`, `load` must return a `Promise`.
