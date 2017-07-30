import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from '@curi/react';
import { Section, Subsection } from '../components/Sections';

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <p>
      If you are bundling an application with a lot of routes, users of your application may be
      downloading a lot of unnecessary content just to render the initial page. Using code splitting,
      you can reduce the initial download size for your application by splitting code that is
      conditionally loaded into a separate bundle that is only downloaded when it is needed.
    </p>

    <Note>
      This guide assumes that you are using Webpack 2+ to bundle your application.
    </Note>

    <Section
      title='An app without code splitting'
      id='no-split'
    >

      <p>
        Let's start out by describing our application's routes without code splitting. We will
        import each route's component from the files where they are defined.
      </p>

      <PrismBlock lang='javascript'>
        {
`import Home from './components/Home';
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
];`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Removing static imports'
      id='no-static-imports'
    >
      <p>
        With code splitting, we don't want to have access to the component values when creating our
        routes because that means we have to download all of them before our application can render.
        We should remove our import calls so that that doesn't happen.
      </p>

      <PrismBlock lang='javascript'>
        {
`const routes = [
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
];`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Importing in preload'
      id='preload'
    >
      <p>
        Now, <InlineJS>Home</InlineJS>, <InlineJS>Contact</InlineJS>, and{' '}
        <InlineJS>ContactMethod</InlineJS> are all undefined, so if we tried to render
        our application we would get errors. We need to actually import our components so that
        our body functions actually have something to return.
      </p>
      <p>
        We will import our components using the preload property of routes. This function will
        only be called the first time that its route matches, so we don't have to worry about
        making extra requests to our server.
      </p>

      <p>
        <InlineJS>preload</InlineJS> should be a function that returns a Promise. Here, we will call
        <InlineJS>import()</InlineJS>, which conveniently returns a Promise.
      </p>

      <PrismBlock lang='javascript'>
        {
`const routes = [
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
];`
        }
      </PrismBlock>
    </Section> 

    <Section
      title='Saving our imports'
      id='saving'
    >
      <p>
        That will load our components when their route matches, but we still don't have access to
        the component functions that we need in order to render. We will need to use a{' '}
        <InlineJS>then</InlineJS> call to our <InlineJS>import()</InlineJS> Promises in order
        to access the component functions.
      </p>

      <PrismBlock lang='javascript'>
        {
`let Home;
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
];`
          }
        </PrismBlock>
      </Section>

      <Section
        title='Storing our imports'
        id='storing'
      >
        <p>
          Our application will now only load components when they are needed and will correctly
          render. However, it is a bit ugly and error prone to define variables for all of our
          routes. Instead we can create a "store" where we can store references to each route's
          component. The simplest store is an object, so we will start with that.
        </p>

        <PrismBlock lang='javascript'>
          {
`const store = {}

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
];`
          }
        </PrismBlock>

        <Subsection
          title='A better store'
          id='better-store'
        >
          <p>
            That should be sufficient, although it is not an error proof approach. Our preload
            functions currently do nothing when there are errors in importing the components.
            What you do when that happens is up to you, but you would most likely want to have a
            default component that you display when the error occurs.
          </p>

          <PrismBlock lang='jsx'>
            {
`const defaultComponent = () => <div>Uh oh, something must have gone wrong</div>;
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
}`
          }
        </PrismBlock>
      </Subsection>
    </Section>

    <Section
      title='Next'
      id='next'
    >
      <p>
        The approaches taken here are not the only way to do code splitting. You may choose to skip
        the preload method and do code splitting at other points in your application. You may also
        create a more full-fledged solution for storing loaded imports. Whatever path you decide
        to go, hopefully this has shown you that setting up code splitting with the preload
        property is fairly simple to do. If you are using Webpack and want to reduce your initial
        bundle size, preload is a great way to accomplish this.
      </p>

      <p>
        Next, we will take a look at a related route property:{' '}
        <Link to='Guide' params={{ slug: 'load' }}>load</Link>.
      </p>
    </Section>
  </BaseGuide>
)
