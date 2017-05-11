# Response

Whenever the location changes, the `curi` config object will create a new `ResponseCreator` object. The properties of this object are changed while the config object walks over its routes. Once the `ResponseCreator` has finished creating a response, it will create a simple JavaScript object to represent its properties. There are two possible types for this response object: regular and redirect.

```js
const response = {
  // The location object used to generate the response.
  location: { ... },

  // The status code for the response. This defaults to `200`, but
  // can be changed if no routes match or a route issues a redirect.
  status: 200,

  // The name of the best matching route
  name: 'Picture',

  // The name of ancestor routes that matched part of the location's pathname
  partials: ['Album'],

  // An object containing the values varsed from the pathname by `path-to-regexp`.
  params: { photoId: 12345, albumId: 6789 },

  // This is either the `value` or the result of calling `call` for
  // the (best matched) route. This provides a way to add data to
  // the response that is associated with the route. For instance, with
  // `curi-react` this would generally be the component that should be rendered.
  body: Picture
};

const redirectResponse = {
  location: { ... },

  // For a redirect, this should be 301 (permanent) or 302 (temporary)
  status: 302,

  // A string representing the uri that should be redirected to
  redirectTo: '/login'
}
```

## Response creator methods

Generally speaking, you will not actually interact directly with the `ResponseCreator`.

If you are using the `load` function of a route, you will interact with a `ResponseCreator` class instead of a response object. Along with accessing its properties (e.g., `params`), the `ResponseCreator` has a few methods that you might find useful to call.

#### `setData(data)`

The data passed to `setData` will be available on the response object as its `data` property.

This may be used alongside or in lieu of a store like Redux.If you do skip having a store, might still want to cache the results to prevent extra requests to your server.

```js
{
  name: 'User',
  path: 'user/:id',
  load: (resp) => {
    return fetch(`/api/user/${resp.params.id}`)
      .then(r => JSON.parse(r))
      .then(data => {
        resp.setData(data);
      })
      .catch(e => {
        // do something when data loading fails
      });
  }
}
```

#### `redirect(to, code)`

The `redirect` method allows you to specify a URI that we should redirect to. The default code is `301`, so if that is the type of redirect you want, you don't have to pass it.

When `redirect` is called, a the response will be a "redirect response".

```js
{
  name: 'Old Profile',
  path: 'profile/:id',
  load: (resp) => {
    resp.redirect(`/user/${resp.params.id}`, 301)
  }
}
```

#### `fail(err)`

The `fail` method can be called to "404" a load function. The `err` will be set on the response object as its `error` property. If you fail to `catch` an error in either your `preload` or `load` functions, this will be automatically called.
