# Curi Glossary

* [addon](#addon)
* [configuration object](#configuration-object)
* [history](#history)
* [load](#load)
* [location](#location)
* [preload](#preload)
* [response](#response)
* [route](#route)

#### addon

A function that uses properties from a route object to generate its output. When the addon is called, it must be given the name of the route that it should use. Some addons also take additional arguments, but only the `name` is required.

When setting up a configuration object, each addon will attempt to register each route with itself. Some routes will be skipped if they don't meet the criteria for being registered with an addon.

#### configuration object

The core of a Curi application, the configuration object marries your application's `history` and its routes. A configuration object is created using the default export function from the `curi` package.

```js
import createConfig from 'curi';

const config = createConfig(history, routes);
```

The configuration object will automatically generate `response` objects whenever navigation occurs. It also provides an API for calling addons using a route's name.

#### history

An object that keeps track of locations and handles navigation. It is created using the [ReactTraining/history](https://github.com/ReactTraining/history) package.

```js
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
```

#### load

A property of a route, this is a function that will be called every time the route matches. The function will be provided the `Response` object that is being generated for the location. This will give it access to the parsed `params` as well as the `setStatus` and `redirect` methods of the `Response`. The function is expected to return a Promise.

```js
{
  name: 'User',
  path: 'user/:id',
  load: (resp) => {
    return fetch(`/api/user/${resp.params.id}`)
      .then(data => {
        // store the data somewhere
      });
  }
}
```

The `load` property can be used to do any setup you want to occur before the route is actually rendered. For instance, you might load data associated with the route prior to it rendering. Another possibility is that you might check to see if the user is allowed to actually view the route and call the response's `redirect` function if they are not allowed.

#### location

A location is an object that represents a URI. It has three guaranteed properties: `pathname`, `search`, and `hash`. Together, those can be concatenated to form a URI. Optionally, there is also a `state` property which represents data associated with the location, but not visible in the URI.

```js
{
  pathname: '/this-is-a/pathname',
  search: '?search=query-string',
  hash: '#hash-data',
  state: {
    extra: 'information can be',
    stored: 'in the location\'s state'
  }
}
```

#### preload

A property of a route, this is a function that will only be called the first time that the route matches. The function is expected to return a Promise.

If you are using code splitting, the `preload` property is where you would import the component (for React, some other type of render function/data if you are not using React) associated with the route. If you use the `preload` property, you will most likely want to also use the route's `call` property.

```js
{
  name: 'About',
  path: 'about',
  preload: () => {
    return import('./components/About')
      .then(module => {
        store.register('About', module.default);
      });
  }
}
```

#### response

An object that represents the outcome of checking which of your routes matches a location's `pathname`. The response object will contain properties `status`, `name`, `params`, `partials`, `body`, and `location`. When a response is a redirect, it will only have the properties `status`, `redirectTo`, and `location`.

```js
{
  status: 200,
  location: { ... },
  name: 'About',
  body: function About() { ... },
  partials: [],
  params: {}
}
```

Internally, a `curi.Response` object is created, but the response object that is emitted by the configuration object is a simple JavaScript object.

#### route

A route is an object with a unique `name` and a `path` string. It can have a number of other properties as well, but the `name` and `path` are required.

```js
{
  name: 'Contact',
  path: 'contact'
}
```
