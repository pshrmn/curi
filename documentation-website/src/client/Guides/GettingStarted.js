import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Link } from '@curi/react';
import { Section, Subsection } from '../components/Sections';

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Curi aims to be easy to setup. To get started, you just need to create a Hickory
      history object and an array of route objects. Pass those as arguments to the{' '}
      <IJS>createConfig</IJS> function to create your configuration object. Then,
      use the Promise returned by <IJS>config.ready()</IJS> to wait for your
      first response to be generated and you're ready to render.
    </p>

    <Section
      title='The History Object'
      id='history-object'
    >
      <p>
        Curi's navigation is powered by the <a href='https://github.com/pshrmn/hickory'>Hickory</a>
        {' '}package. You just need to pick which type of Hickory history object is right
        for your application.
      </p>
      <PrismBlock lang='javascript'>
      {
`// Use Browser when your website has a dynamic server
import Browser from '@hickory/browser';
const browserHistory = Browser();

// Use Hash when your website uses a static file server
import Hash from '@hickory/hash';
const hashHistory = Hash();

// Use InMemory when your application doesn't run in a browser
import InMemory from '@hickory/in-memory';
const memoryHistory = InMemory();`
      }
      </PrismBlock>

      <p>
        Each history object has essentially the same API (InMemory has a few extra properties).
        The most important properties to know are the location object as well as the update, push, and
        replace methods.
      </p>

      <p>

      </p>

      <PrismBlock lang='javascript'>
        {
`// the location property is the current location object
browserHistory.location === {
  pathname: '/guides/getting-started',
  ...
};

// the push method will navigate to a new location
browserHistory.push({ pathname: '/guides/installation' });

// the replace method will replace the current location
// with the provided one
browserHistory.push({ pathname: '/guides/confirming-navigation' });

// the update method will choose whether to push or replace for you
browserHistory.update({ pathname: '/guides/getting-started' });
`
        }
      </PrismBlock>
    </Section>

    <Section
      title='The Routes Array'
      id='routes-array'
    >
      <p>
        Routes are objects with two required properties: name and path.
      </p>
      <p>
        Paths can be any valid <a href="https://github.com/pillarjs/path-to-regexp">path-to-regexp</a>
        {' '}string. It is just important that you do not begin the string with a forward slash (/).
        Forward slashes are fine anywhere else in the path. (<IJS>this/is/fine</IJS>, but {' '}
        <IJS>/this/is/not</IJS>).
      </p>
      <p>
        The names are used to generate URIs for you. With Curi, you never have to write a
        URI's pathname string yourself. It is required that all of your routes have unique names. This
        is because Curi generates location pathnames using route names (and params for non-static paths).
      </p>
      <PrismBlock lang='javascript'>
      {
`const routes = [
  {
    name: 'Home',
    path: '', // matches the pathname /
    ...
  },
  ...
]`
        }
      </PrismBlock>
      <p>
        How route matching works and the other route properties are explained more in-depth in
        the <Link to='Guide' params={{ slug: 'routes' }}>All About Routes</Link> guide.
      </p>
    </Section>

    <Section
      title='The Configuration Object'
      id='configuration-object'
    >
      <p>
        Once you have your Hickory history object and your routes array, you just need to
        pass them to the default export from the Curi package (which we will name{' '}
        <IJS>createConfig</IJS> here).
      </p>
      <PrismBlock lang='javascript'>
        {
`import createConfig from 'curi';
import Browser from '@hickory/browser';
import routes from './routes';

const history = Browser();
const config = createConfig(history, routes);
`
        }
      </PrismBlock>

      <Subsection
        title='Other configuration options'
        id='other-configuration-options'
      >
        <p>
          The <IJS>createConfig</IJS> function
          can also take an optional third argument, which is an options object. You can use this
          to pass <Link to='Guide' params={{ slug: 'addons' }}>addons</Link>,{' '}
          <Link to='Guide' params={{ slug: 'side-effects' }}>side effects</Link>, a{' '}
          <Link to='Guide' params={{ slug: 'response-caching' }}>cache</Link>, and a{' '}
          <a href="https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp">
            <IJS>pathnameOptions</IJS>
          </a> object to your configuration object.
        </p>
        <PrismBlock lang='javascript'>
          {
`const config = createConfig(history, routes, {
  addons: [...],
  sideEffects: [...],
  cache: cacheObject,
  pathnameOptions: { encode: x => x }
});`
          }
        </PrismBlock>
      </Subsection>
    </Section>

    <Section
      title='Responses'
    >
      <p>
        Whenever navigation happens, a new location object is created by Hickory. Curi uses
        that location object's pathname property to match against all of your routes. When
        it finds one that matches, it uses that route object to create a response object. You
        can subscribe to a Curi configuration object, and when a new response is created, your
        subscriber function will be called with the response.
      </p>
      <PrismBlock lang='javascript'>
        {
`const config = createConfig(history, routes);
config.subscribe(response => {
  // whenever the location changes, this function is called
  // you can use this function to re-render your application
  // using the new response object
});
`
        }
      </PrismBlock>

      <p>
        Responses are generated asynchronously. A Curi configuration object has a{' '}
        <IJS>ready</IJS> function that returns a Promise and will resolve once
        the initial response has been generated. You do not have to use this, but it allows
        you to delay rendering until after the first response has been generated. If you want
        to render immediately, then you will need to handle how to render when there is no
        response.
      </p>
      <PrismBlock lang='javascript'>
        {
`const config = createConfig(history, routes);
// wait to render until the first response is generated
config.ready().then(response => {
  // now we can render using the first response.
});`
        }
      </PrismBlock>
      <p>
        Your location-based rendering will be centered around these response objects,
        so you should be familiar with the different properties that will be available
        to you. We will get into more details about responses in the{' '}
        <Link to='Guide' params={{ slug: 'responses' }}>Rendering with Responses</Link> guide,
        but for now we will just go over how a route maps to a response.
      </p>
      <PrismBlock lang='javascript'>
      {
`// if you have the following routes
const routes = [
  ...,
  {
    name: 'Album',
    path: 'photos/:albumID',
    ...,
    children: [
      {
        name: 'Photo',
        path: ':photoID',
        body: () => Photo
      }
    ]
  }
];
// when the user visits the URI /photos/6789/12345
// the following response object would be created:

{
  // The location key
  key: '1.0',

  // The location object used to generate the response.
  location: { pathname: '/photos/6789/12345', ... },

  // The value returned by the route's body function
  body: Photo,

  // The name of the best matching route
  name: 'Photo',

  // The name of ancestor routes that matched
  // part of the location's pathname
  partials: ['Album'],

  // An object containing the values parsed
  // from the pathname by path-to-regexp.
  params: { photoID: 12345, albumID: 6789 },

  // There are a few more properties as well. Please read
  // the Rendering with Responses guide to see those
}`
       }
      </PrismBlock>
    </Section>

    <h2>Next</h2>
    <p>
      Now that you know the core of how Curi works, let's take a closer look at routes with
      the <Link to='Guide' params={{ slug: 'routes' }}>All About Routes</Link> guide.
    </p>
  </BaseGuide>
);
