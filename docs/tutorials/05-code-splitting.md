# Code Splitting Tutorial

If you are bundling an application with a lot of routes, users of your application may be downloading a lot of unnecessary content just to render the initial page. Using code splitting, you can reduce the initial download size for your application by splitting code that is conditionally loaded into a separate bundle that is only downloaded when it is needed.

The approach we will take here is not the only way to do this, but it is the recommended way to do code splitting with Curi.

Let's start out by describing our application's routes without code splitting. We will continue to use the application developed in parts 1 and 2, but now our components have been moved to their own files in the `components` directory. We will import them and define our routes as follows:

```js
import Home from './components/Home';
import Contact from './components/Contact';
import ContactMethod from './components/ContactMethod';

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

With code splitting, we don't want to have access to the component values when creating our routes because that means we have to download all of them before our application can render. We should remove our import calls so that that doesn't happen.

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

Now, `Home`, `Contact`, and `ContactMethod` are all `undefined`, so if we tried to render our application we would get errors. We need to actually import our components so that our `body` functions actually have something to return. We will import our components using the `preload` property of routes. This function will only be called the first time that its route matches, so we don't have to worry about making extra requests to our server.

`preload` should be a function that returns a Promise. Here, we will call `import()`, which conveniently returns a Promise.

```js
const routes = [
  {
    name: 'Home',
    path: '',
    preload: () => import('./components/Home'),
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    preload: () => import('./components/Contact'),
    body: () => Contact,
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        preload: () => import('./components/ContactMethod'),
        body: () => ContactMethod
      }
    ]
  }
];
```

That will load our components when their route matches, but we still don't have access to the component functions that we need in order to render. We will need to use a `then` call to our `import()` Promises in order to access the component functions. We will 

```js
let Home;
let Contact;
let ContactMethod;

const routes = [
  {
    name: 'Home',
    path: '',
    preload: () => (
      import('./components/Home').then(module => {
        Home = module.default;
      })
    ),
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    preload: () => (
      import('./components/Contact').then(module => {
        Contact = module.default;
      })
    ),
    body: () => Contact,
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        preload: () => (
          import('./components/ContactMethod').then(module => {
            ContactMethod = module.default;
          })
        ),
        body: () => ContactMethod
      }
    ]
  }
];
```

Our application will now only load components when they are needed and will correctly render. However, it is a bit ugly and error prone to define variables for all of our routes. Instead we should create a "store" where we can store references to each route's component. The simplest store is an object.

```js
const store = {}

const routes = [
  {
    name: 'Home',
    path: '',
    preload: () => (
      import('./components/Home').then(module => {
        store['Home'] = module.default;
      })
    ),
    body: () => store['Home']
  },
  {
    name: 'Contact',
    path: 'contact',
    preload: () => (
      import('./components/Contact').then(module => {
        store['Contact'] = module.default;
      })
    ),
    body: () => store['Contact'],
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        preload: () => (
          import('./components/ContactMethod').then(module => {
            store['ContactMethod'] = module.default;
          })
        ),
        body: () => store['ContactMethod']
      }
    ]
  }
];
```

That should be sufficient, although it is not an error proof approach. Our `preload` functions currently do nothing when there are errors in importing the components. What you do when that happens is up to you, but you would most likely want to have a default component that you display when the error occurs.

```js
const defaultComponent = () => <div>Uh oh, something must have gone wrong</div>;
const store = {
  stored: {},
  set: function(name, value) {
    this.stored[name] = value;
  },
  get: function(name) {
    return this.stored[name] || defaultComponent;
  }
}

// usage
{
  ...,
  preload: () => (
    import('./components/Something')
      .then(module => {
        store.set('Something', module.default);
      })
      .catch(err => {
        console.error(err);
        store.set('Something', defaultComponent);
      })
  ),
  body: () => store.get('Something')
}
```
