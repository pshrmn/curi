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

#### `body`

The `body` property gives you the opportunity to attach the `body` property of a response for a given route. This must be a function and its return value will be what is set as the response object's `body` property.

```js
// when the user visits /contact, the response object's body
// property will be the Contact value
const contact = {
  name: 'Contact',
  path: 'contact',
  body: () => Contact
};
```

#### `title`

You can use the `title` property of a route to specify a title that should be set on the response when that route matches. This can either be a string or a function. If it is a string, then the `response.title` will be set to the value of `route.title`. If it is a function, it will be called (and passed the `response.params` and `response.data` values) to generate the title string.

If a route does not have a `title` property, then when it matches, the response's `title` property will be an empty string.

```js
// as a string
{
  name: 'Contact',
  path: 'contact',
  title: 'How to contact us'
}

// as a function
{
  name: 'Contact Method',
  path: ':method',
  title: (params, data) => `Contact via ${params.method}`
}
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
