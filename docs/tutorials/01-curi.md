# Curi Tutorial

Here, we will setup a basic Curi application by creating a Curi configuration object.

## Install

We will need to install `curi` as well as the `history` package.

```sh
npm install --save history curi
```

## Creating a configuration object

The default export from the `curi` package is a function that creates a configuration object. You can name it anything you like, but I prefer to use `createConfig`.

```js
import createConfig from 'curi';
```

The `createConfig` function takes three arguments: the first is a `history` object, the second is a `routes` array, and the third is an `options` object.

#### history

Curi relies on the [history](https://github.com/ReactTraining/history) package to perform in-app navigation. There are three different types of history that you may use: browser, hash, and memory. We are building a web application, so we should choose betweeen browser and hash. If you are going to be hosting your application on a static file server, you will need to use a hash history. Otherwise, if you will be hosting your application on a server that can respond to dynamic requests, you should use a browser history. For the purposes of this tutorial, we will use a hash history so you can run the project simply by opening an HTML file in your browser.

```js
import createHistory from 'history/createHashHistory';

const history = createHistory();
```

#### routes

Curi uses plain JavaScript objects to describe routes. There are two properties of each route object that are required: a unique `name` and a `path` string. The `path` will be compiled by [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp), so you can check out the documentation there for advanced path formatting information.

For this tutorial project, we will be creating an application with three routes: home, contact, and contact method. The contact method route is a child of the contact route, so its full path will be formed by joining the contact route's `path` with its own `path` (using a forward slash (`/`)). Curi handles this string concatentation automatically for you; a route's `path` should only contain the segments specific to that route.

You should note that the `path` strings defined below do not begin with a forward slash (`/`). `path` strings should never begin with a forward slash.

```js
const routes = [
  {
    name: 'Home',
    path: ''
  },
  {
    name: 'Contact',
    path: 'contact'
    children: [
      {
        name: 'Contact Method',
        path: ':method'
      }
    ]
  }
];
```

#### options

The `options` object allows you to pass additional options to your Curi configuration object. These include any `addons` or `middleware` that you want to use, as well as a `cache` function. We will not be using any of these in this tutorial, but here is a brief overview of what they are:

##### addons

Curi addons allow you to interact with routes using a route's name. There is a built-in addon called `pathname` that you can call to generate a `pathname` for the route (which will insert any route params for you).

```js
const pathname = config.addons.pathname('Contact Method', { method: 'email' });
// pathname === '/contact/email'
```

There are additional "official" addons and you can also easily create your own addons. These will be covered in another tutorial.

##### middleware

Middleware functions allow you to modify a response object. We haven't actually discussed response objects yet, but they will be covered later in this tutorial Additionally, there is another tutorial that will cover "official" middleware and how to write your own.

##### cache

You can provide your own caching object to your configuration object. This allows you to re-use responses when one exists for a previously requested location. This is most likely unnecessary for your project, but it exists in case you find yourself wanting it.

## Creating our configuration object

Once you have your `history` and `routes` setup, you can create your configuration object.

```js
const config = createConfig(history, routes);
```

#### Curi responses are async

At this point, your application is _almost_ ready to render. The way that Curi works is that whenever the location changes, a "response" object is generated. This object contains information about the route that matches the location. You can subscribe to a Curi configuration object with a function, and that function will be called any time Curi creates a new response (this lets you re-render your application using the new response object).

Curi also allows you to load data for a route using `preload` and `load` properties of the route. Data loading is done using Promises. Promises are asynchronous (other parts of your code will continue running while the Promise is running), so we have to wait for the loading Promises to "resolve" before we can emit the response to any subscribed functions. Even routes that do not contain `preload`/`load` properties are run async.

Alongside generating new responses when the location changes, your Curi configuration object creates an initial response when it is made. Because the response generation is async, we don't necessarily want to render anything until we know that the first response is ready. To do this, the configuration object includes a `ready` function. When you call `ready`, it will return a Promise that will not resolve until the initial response has been generated. It is not absolutely necessary for you to use `config.ready`, but if you do not, then you will have to handle what to render before the initial response has completed. You can read more about choosing to use `config.ready()` [here](../../packages/curi/docs/Guides/ready-or-not.md).

```js
config.ready().then(response => {
  // we can safely render
})
```

## Subscribing to the configuration object

As stated above, you can pass a function to the configuration object's `subscribe` method and that function will be called whenever a response object is created.

```js
function renderMyApplication(response) {
  document.getElementById('app').textContext = 'At route: ' + response.name;
}

config.subscribe(renderMyApplication);
```

## Linking to registered routes

Every Curi configuration object has a `pathname` addon. You can use this to generate links to navigate within your application.

```js
function makeLink(name, params, text) {
  const a = document.createElement('a');
  const pathname = config.addons.pathname(name, params);
  a.onClick = function(event) {
    event.preventDefault();
    config.history.push(pathname)
  };
  a.href = pathname;
  return a;
}
```

## Rendering your application

The above subscribing/linking sections demonstrate how to render an application using plain JavaScript. Curi doesn't care how you render your application, it is just concerned with generating responses when the location changes.

Rendering with plain JavaScript works, but it can be a pain to deal with. Curi also provides packages to use Curi with a React application. Please check out the [Curi/React tutorial](./02-curi-react.md) to learn how to do this.
