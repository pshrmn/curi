import React from 'react';
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import { Link } from '@curi/react';
import Banner from '../components/Banner';

export default () => (
  <div>
    <Banner />
    <div className='features'>
      <h2>Features</h2>

      <div className='feature'>
        <h3>Framework Integration</h3>

        <p>
          While Curi is a universal router, it still has to be integrated with
          whichever framework you are using to render your application. Currently,
          there are packages to easily use Curi with React and Vue applications
          (as well as one that provides basic Svelte support).
        </p>

        <div className='code'>
          <div className='description'>
            <p>
              You can attach a <IJS>body</IJS> property to response object. Generally,
              this attached value should be a function or component (this would vary
              based on how your framework renders), but it can be anything you want it to be.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`// routes.js
import User from './components/User';

const routes = [
  // ...
  {
    name: 'User',
    path: 'u/:userID',
    match: {
      response: ({ set }) => {
        set.body(User);
      }
    }
  }
];`
            }
            </PrismBlock>

        </div>
        <p>
          Links are used for navigating between locations within an application.
          Links handle URI formatting for you, all you have to do is know the
          name (and parameters) of the route that you want to link to.
        </p>
        <div className='code'>
          <div className='description'>
            <p>
              The <IJS>@curi/react</IJS> package provides a <Cmp>Link</Cmp> component
              for rendering links in React applications.
            </p>
          </div>
          <PrismBlock lang='jsx'>
            {
`import Link from '@curi/react-link';

const NavLinks = () => (
  <div>
    <Link to='Home'>Home</Link>
    <Link to='User' params={{ userID: 4 }}>
      User Four
    </Link>
  </div>
);`
            }
          </PrismBlock>
        </div>
        <div className='code'>
          <div className='description'>
            <p>
              With Vue, you register Curi using a Vue plugin from the <IJS>@curi/vue</IJS>
              {' '}package. That plugin will make the <Cmp>curi-link</Cmp> component
              available to use in your application.
            </p>
          </div>
          <PrismBlock lang='html'>
            {
`<!-- NavLinks.html -->
<div>
  <curi-link to='Home'>Home</curi-link>
  <curi-link to='User' :params="{ userID: 4 }">
    User Four
  </curi-link>
</div>`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Response Objects</h3>
        <p>
          Whenever the location changes (and on initial load), Curi will generate a
          response object with data based on the matching route. The properties of this
          object are what you can use to render your application. You can learn more
          about these in the <Link to='Guide' params={{ slug: 'responses' }}>
            rendering with responses
          </Link> guide.
        </p>
        <div className='code'>
          <div className='description'>
            <p>
              The <IJS>body</IJS> property is the return value from the matching
              route's <IJS>body</IJS> function.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`{
  key: '123',
  location: { pathname: '/u/456', ... },
  status: 200,
  name: 'User',
  body: function() { return ... },
  params: { userID: '456' },
  ...
}`
            }
          </PrismBlock>
        </div>

        <div className='code'>
          <div className='description'>
            <p>
              <IJS>data</IJS> can contain values that you load using a route's{' '}
              <IJS>match.every</IJS> function. The response won't be be generated until
              after the <IJS>match.every</IJS> function has resolved, so if you use this
              property, you don't have to render a bunch of loading spinners or empty
              content while waiting for the data to be loaded.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`{
  ...,
  data: {
    username: 'curi',
    id: '234235',
    color: '#222233'
  }
}`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Expressive Route Matching with <IJS>path-to-regexp</IJS></h3>
        <p>
          Curi uses <a href="https://github.com/pillarjs/path-to-regexp">path-to-regexp</a>
          {' '}to define route paths. This allows you to define route parameters that will
          be parsed from the URI and added to the response object (when the route matches).
        </p>
        <div className='code'>
          <div className='description'>
            <p>
              In the accompanying example code, when the <IJS>User</IJS> route matches, the
              response object's <IJS>params</IJS> object will have an <IJS>id</IJS> property
              whose value is parsed from the URI.
            </p>
            <p>
              <IJS>path-to-regexp</IJS> offers a number of matching options, which you can 
              learn more about from <a href="https://github.com/pillarjs/path-to-regexp">
                its documentation
              </a>.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`const routes = [
  {
    name: 'User',
    // when the User route matches, the "id"
    // value will be parsed from the pathname
    // and placed in the "params" property of
    // the response
    path: 'u/:id'
  }
];`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Route Nesting</h3>
        <div className='code'>
          <div className='description'>
            <p>
              For nested routes, you only have to define the additional URI segments. Those will
              automatically be joined with any ancestor routes for you. If any ancestor
              routes have path parameters, those will be included in the response's{' '}
              <IJS>params</IJS> object.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`const routes = [
  {
    name: 'Album',
    path: 'a/:albumID',
    match: {
      response: ({ set }) => {
        set.body(Album);
      }
    },
    children: [
      {
        name: 'Song',
        path: ':songID',
        match: {
          response: ({ set }) => {
            set.body(Song);
          }
        }
      }
    ]
  }
]`
            }
          </PrismBlock>
        </div>

        <div className='code'>
          <div className='description'>
            <p>
              Given the above example routes, when a user visits the URI{' '}
              <IJS>/a/4815/162342</IJS>, we will get the following response object. The{' '}
              <IJS>partials</IJS> array contains the ancestor route <IJS>"Song"</IJS>, which
              makes it easy to identify "active" ancestor routes.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`// pathname = '/a/4815/162342'
{
  body: Song,
  params: { albumID: '4815', songID: '162342' },
  name: 'Song',
  partials: ['Album'],
  ...
}
`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Navigation Powered by <IJS>hickory</IJS></h3>
        <p>
          Curi integrates with the{' '}
          <a href='https://github.com/pshrmn/hickory'><IJS>hickory</IJS></a> package to
          make navigation within your application very easy.
        </p>
        <div className='code'>
          <div className='description'>
            <p>
              Choose between the <IJS>browser</IJS>, <IJS>hash</IJS>, and <IJS>in-memory</IJS>
              {' '}history types (depending on your environment).
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`import Browser from '@hickory/browser';
import Hash from '@hickory/hash';
import InMemory form '@hickory/in-memory';`
            }
          </PrismBlock>
        </div>

        <div className='code'>
          <div className='description'>
            <p>
              Programmatically navigate using <IJS>push</IJS>, <IJS>replace</IJS>,
              and <IJS>navigate</IJS> (a combination of push and replace that
              replicates how anchors work).
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`const history = Browser();
history.push({ pathname: '/login' });
history.replace({ pathname: '/profile' });
history.navigate({ pathname: '/album/934' });`
            }
          </PrismBlock>
        </div>

        <div className='code'>
          <div className='description'>
            <p>
              Of course, you never have to actually generate pathnames yourself. Curi's
              built-in <IJS>pathname</IJS> addon will generate pathnames given the name
              of a route (and any of that route's parameters). This addon is used by the
              various link components to generate <IJS>anchor</IJS> attributes.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`const routes = [
  { name: 'Album', path: 'a/:albumID' }
];
const config = createConfig(history, routes);
const pathname = config.addons.pathname(
  'Album',
  { albumID: '3490' }
);
history.navigate({ pathname });`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Code Splitting</h3>
        <div className='code'>
          <div className='description'>
            <p>
              Use the <IJS>match.initial</IJS> and <IJS>match.response</IJS> functions to
              add code splitting at your routes.
            </p>
            <p>
              <strong>Note:</strong> This relies on a bundler like Webpack.
            </p>
            <p>
              You can learn more about this with the{' '}
              <Link to='Guide' params={{ slug: 'code-splitting' }}>code splitting</Link> guide.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`const routes = [
  {
    name: 'User',
    path: 'users/:userID',
    match: {
      initial: () => (
        import('./components/User')
          .then(module => module.default)
      ),
      response: ({ resolved, set }) => {
        set.body(resolved.initial);
      }
    }
  }
  ...,
]`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Server Side Rendering</h3>
        <div className='code'>
          <div className='description'>
            <p>
              Server side rendering is pretty much the same as client side rendering. The main
              difference is that you will use an in-memory history instead of a browser history.
            </p>
          </div>
          <PrismBlock lang='jsx'>
            {
`import InMemory from '@hickory/in-memory';

function requestHandler(req, resp) {
  // create a history using the requested location
  const history = InMemory({
    locations: [req.url]
  });
  const config = createConfig(history, routes);

  config.respond((response) => {
    // render the markup. This will vary based on
    // your rendering library, but here we'll
    use React
    const markup = renderToString(
      <CuriBase
        response={response}
        config={config}
        render={render}
      />
    );

    // insert the generated HTML into the full
    // HTML of the page and send the response
    res.send(fullPageHtml(markup));
  }, { once: true });
}`
            }
          </PrismBlock>
        </div>
      </div>
    </div>
  </div>
);
