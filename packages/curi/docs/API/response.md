# Response

Whenever the location changes, the `curi` config object will create a new `Response` object. The properties of this object are changed while the config object walks over its routes.

Generally speaking, you will not actually interact directly with the `Response`. Most of the properties will be set for you. However, you do have the opportunity to interact with it in a route's `load` property method. This gives you the opportunity redirect or "404" a route (e.g., if the route's data fetch fails).

```js
const routes = [
  {
    name: 'Old Profile',
    path: path('profile/:id'),
    load: (resp) => {
      resp.redirect(`/user/${resp.params.id}`, 301)
    }
  },
  {
    name: 'Profile',
    path: path('user/:id')
  }
]
```

Once all of the routes have been walked over, the `Response` object will create a JavaScript object with the relevant properties. There are two possible types of objects that this will be: regular and redirect.

A redirect response is created whenever the `Response`'s `redirect` method has been called. This response just contains the necessary information to redirect to the new URI.

A regular response has more properties that can be used to render an application.

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
}
```
