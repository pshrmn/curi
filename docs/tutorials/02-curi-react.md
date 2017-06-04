# Curi and React Tutorial

In this tutorial, we will setup a React application to use with our Curi configuration object generated in [part 1](./01-curi.md). The one change is that because we are using React, we will use a browser history so that we can take advantage of `create-react-app`.

## The Components

Our application has three route: home, contact, and contact method. We will need to create a component for each of these routes.

```js
const Home = () => (
  <div>Welcome Home!</div>
);

const Contact = () => (
  <div>Please do not contact us</div>
);

const ContactMethod = (props) => (
  <div>Please do not contact us by {props.params.method}</div>
);
```

The components are quite simple. The one thing to note is that the `<ContactMethod>` expects a `param` prop.

## Route Components

We will need to modify our routes so that they know what to render when they match a location. To do this, we will use the `body` property of a route. The `body` property is a function that returns the value to be set as the `response` object's `body` property.

```js
const routes = [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    body: () => Contact,
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        body: () => ContactMethod
      }
    ]
  }
];
```

## Quick Intro to `curi-react`

There are a number of React specific Curi packages that export components that are "Curi aware". The `curi-react` package re-exports a number of these for simplicity.

```sh
npm install --save curi-react
```

The two most important components are `<Navigator>` and `<Link>`.

#### <Navigator>

The `<Navigator>` takes a Curi configuration object and subscribes to our configuration object for us. The function is passes to `config.subscribe` will trigger re-renders whenever a new response is emitted.

Rendering is done using a function as its `children` prop. The `children` prop function returns a React element that _is_ your application.

```js
function renderFunction(response) {
  return <response.body />;
}

ReactDOM.render((
  <Navigator config={config}>
    {renderFunction}
  </Navigator>
), document.getElementById('root'));
```

#### <Link>

`<Link>`s create anchors (`<a>`s) for you, allowing you to navigate within your application.

```js
<Link to='Contact'>Contact</Link>
```

## Rendering our application

At the root of our application, we will render a `<Navigator>` and pass it our Curi configuration object and a render function. We should start by defining our render function.

#### Render function

The render function will be passed two arguments: `response` and `config`. The `response` argument is a response object that we will use for rendering our appliaction. The `config` argument is our Curi configuration object, and can be useful if you need to call an addon or use any `history` methods. We do not need to do either of those, so we will be leaving it out of our render function.

```js
function renderFunction(response) {
  return <div></div>;
}
```

Our application will have two main sections: the component set as `response.body` (the route's `value`) and our navigation section.

##### The body

The response object's `body` property will the a `value` from our routes when a route matches. If no routes match, body will be `undefined`. To deal with this, we should verify that `body` is defined before attempting to render it. Here, we will simply render `null` when no routes match. In a real application, some sort of "page not found" component should actually be used.

```js
function renderFunction(response) {
  const { body } = response;
  const Body = body ? body : null;
  return (
    <div>
      <Body />
    </div>
  );
}
```

If you recall from above, one of our components also expects to receive a `params` prop. To pass it, we just need to pass our `<Body>` the `params` object from our response object.

```js
function renderFunction(response) {
  const { body, params } = response;
  const Body = body ? body : null;
  return (
    <div>
      <Body params={params} />
    </div>
  );
}
```

##### The navigation

A site that provides no navigation isn't very user friendly. We should create a `<Nav>` component that renders links to the different pages in our application.

```js
const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to='Home'>Home</Link>
      </li>
      <li>
        <Link to='Contact'>Contact</Link>
        <ul>
          <li>
            <Link to='Contact Method' params={{ method: 'email' }}>Email</Link>
          </li>
          <li>
            <Link to='Contact Method' params={{ method: 'phone' }}>Phone</Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);
```

For our route that includes params (the `Contact Method`'s path is `:method`), we just provide our `<Link>`s a params object with the appropriate properties.

**Note:** Unfortunately, there is currently an issue in how `history` deals with encoded characters in pathnames. If you have any params that need to be encoded (e.g. if one of our contact methods was 'text message'), then you will run into encoding/decoding issues if you use `history`. Until that is fixed, you should instead use the [tmp-history](https://www.npmjs.com/package/tmp-history) package. It is essentially identical to the history package, but does not have the encoding issue.

We can then update our render function with our `<Nav>` component.

```js
function renderFunction(response) {
  const { body, params } = response;
  const Body = body ? body : null;
  return (
    <div>
      <Nav />
      <Body params={params} />
    </div>
  );
}
```

#### ReactDOM.render

Now, we are finally ready to render our application. We just render a `<Navigator>` and pass it our render function and our Curi configuration object.

```js
config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config}?
      {renderFunction}
    </Navigator>
  ), document.getElementById('root'));
});
```

If you recall from part one, you can use `config.ready` to ensure that our first response is ready before rendering. If you do not, then you will need to modify your render function to handle rendering when the response is `undefined`.

```js
function renderFunction(response) {
  if (!response) {
    return null;
  }
  // ...
}

ReactDOM.render((
  <Navigator config={config}>
    {renderFunction}
  </Navigator>
), document.getElementById('root'));
```

Either approach generally works, but if you are using server-side rendering, you will have to use `config.ready` to ensure that the initial output on the client-side matches the output from the server.


## Everything

Below is the full code for the application. Using it, you should now have a working application that you can click around in to view the different pages. 


```js
import React from 'react';
import ReactDOM from 'react-dom';
import createConfig from 'curi';
import createHistory from 'history/createBrowserHistory';

const Home = () => (
  <div>Welcome Home!</div>
);

const Contact = () => (
  <div>Please do not contact us</div>
);

const ContactMethod = (props) => (
  <div>Please do not contact us by {props.params.method}</div>
);

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to='Home'>Home</Link>
      </li>
      <li>
        <Link to='Contact'>Contact</Link>
        <ul>
          <li>
            <Link to='Contact Method' params={{ method: 'email' }}>Email</Link>
          </li>
          <li>
            <Link to='Contact Method' params={{ method: 'phone' }}>Phone</Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

const history = createHistory();
const routes = [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    body: () => Contact,
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        body: () => ContactMethod
      }
    ]
  }
];

const config = createConfig(history, routes);

function renderFunction(response) {
  const { body } = response;
  const Body = body ? body : null;
  return (
    <div>
      <Body />
    </div>
  );
}

config.ready().then(() => {
  ReactDOM.render((
    <Navigator config={config}>
      {renderFunction}
    </Navigator>
  ), document.getElementById('root'));
});
```
