import React from 'react';
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import { Link } from '@curi/react';

export default () => (
  <div>
    <div className='banner'>
      <h1>Curi</h1>
      <p>
        A single page application router for any JavaScript rendering library.
      </p>
      <PrismBlock
        lang='javascript'
      >
      {
`import Browser from '@hickory/browser';
import createConfig from '@curi/core';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi configuration object
const config = createConfig(history, routes);

// subscribe to the config object with a function
// that will be called whenever a new response
// is generated
config.subscribe((response, action) => {
  // handle any rendering inside of this function
});`
        }
      </PrismBlock>
      <p>
        Ready to learn more? Check out the{' '}
        <Link to='Guide' params={{ slug: 'getting-started' }}>getting started</Link> guide.
      </p>
    </div>
    <div className='features'>
      <h2>Features</h2>

      <div className='feature'>
        <h3>Easy React Integration</h3>

        <p>
          Curi is not just a React router, but React is currently the best supported rendering library
          for Curi.
        </p>  

        <div className='code'>
          <div className='description'>
            <p>
              Use the <IJS>body</IJS> property of routes to specify each route's component:
            </p>
          </div>
          <PrismBlock lang='jsx'>
            {
`const Home = () => <div>Home</div>;
const User = props => <div>User {props.params.userID}</div>;
const NotFound = () => <div>Page not found...</div>;

const routes = [
  { name: 'Home', path: '', body: () => Home },
  { name: 'User', path: 'u/:userID', body: () => User },
  { name: 'Not Found', path: '*', body: () => NotFound }
];`
              
            }
          </PrismBlock>
        </div>

        <div className='code'>
          <div className='description'>
            <p>
              <Cmp>Link</Cmp>s are used for navigating between locations within an application.
              URI formatting is handled for you, all you have to do is know the name (and parameters)
              of the route that you want to link to.
            </p>
          </div>
          <PrismBlock lang='jsx'>
            {
`import Link from '@curi/react-link';

const Nav = () => (
  <div>
    <Link to='Home'>Home</Link>
    <Link to='User' params={{ userID: 4 }}>User Four</Link>
  </div>
);`
            }
          </PrismBlock>
        </div>

        <div className='code'>
          <div className='description'>
            <p>
              The <Cmp>Navigator</Cmp> is responsible for re-rendering the application every time
              the location changes, using the <IJS>render</IJS> function.
            </p>
          </div>
          <PrismBlock lang='jsx'>
            {
`import Navigator from '@curi/react-navigator';

ReactDOM.render((
  <Navigator config={config} render={(response) => {
    const { body:Body } = response;
    return (
      <div>
        <Nav />
        <Body />
      </div>
    );
  }}
));`
            }
          </PrismBlock>
        </div>

        <p>
          There are a number of other Curi + React components, but <Cmp>Navigator</Cmp> and{' '}
          <Cmp>Link</Cmp> are the only ones that you'll need to be familiar with while getting
          started.. You can see the others via the{' '}
          <Link to='Package' params={{ package: 'react' }}><IJS>@curi/react</IJS></Link> page.
        </p>
      </div>

      <div className='feature'>
        <h3>Information Rich Response Objects</h3>
        <p>
          Whenever the location changes (and on initial load), Curi will generate a response
          object with data on the matching route. The properties of this object are what you
          can use to render your application. You can learn more about these in the{' '}
          <Link to='Guide' params={{ slug: 'responses' }}>rendering with responses</Link> guide.
        </p>
        <div className='code'>
          <div className='description'>
            <p>
              There isn't one "right" way to render using the response object, but it is
              useful for <IJS>body</IJS> to be a function that will render the content for the
              route. (The body property of a response is the value returned by calling the body
              property of a route.)
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
              The <IJS>data</IJS> property of the response can contain data that you load using
              a route's <IJS>load</IJS> function. The response won't be be generated until after
              the data has fully loaded, so if you use this property, you don't have to render a
              bunch of loading spinners or empty content while waiting for the data to be loaded.
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
        <h3>Powerful Route Matching with <IJS>path-to-regexp</IJS></h3>
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
              learn more about from its documentation.
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
        <h3>No Hassle Nested Routes</h3>
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
    body: () => Album,
    children: [
      {
        name: 'Song',
        path: ':songID',
        body: () => Song
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
              Navigate to new locations using <IJS>push</IJS>, <IJS>replace</IJS>, and{' '}
              <IJS>navigate</IJS> (a combination of push and replace that duplicates how anchors
              work).
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
              Of course, you never have to actually generate pathnames yourself. Instead, you
              should use Curi's built-in <IJS>pathname</IJS> addon to create them for you.
            </p>
            <p>
              The <Cmp>Link</Cmp>s from <IJS>@curi/react-link</IJS> and{' '}
              <IJS>@curi/vue</IJS> use the <IJS>pathname</IJS> addon internally to generate
              the <IJS>href</IJS> attribute of the anchor elements that they render.
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
);`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Simple Code Splitting</h3>
        <div className='code'>
          <div className='description'>
            <p>
              Use the <IJS>preload</IJS> and <IJS>body</IJS> properties to add code splitting
              at your routes.
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
`const store = {};

const routes = [
  {
    name: 'User',
    path: 'users/:userID',
    preload: () => import('./components/User')
      .then(module => { store['User'] = module.default; }),
    body: () => store['User']
  }
  ...,
]`
            }
          </PrismBlock>
        </div>
      </div>

      <div className='feature'>
        <h3>Straightforward Server Side Rendering</h3>
        <div className='code'>
          <div className='description'>
            <p>
              Server side rendering is pretty much the same as client side rendering. The main
              difference is that you will use an in-memory history instead of a browser history.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`import InMemory from '@hickory/in-memory';

function requestHandler(req, resp) {
  // create a history using the requested location
  const history = InMemory({ locations: [req.url] });
  const config = createConfig(history, routes);

  config.subscribe((response, action) => {
    // render the markup. This will vary based on your
    // rendering library, but here we'll use React
    const markup = renderToString(
      <Navigator
        response={response}
        action={action}
        config={config}
        render={render}
      />
    );

    // insert the generated HTML into the full HTML of the
    // page and send the response
    res.send(fullPageHtml(markup));
  });
}`
            }
          </PrismBlock>
        </div>
      </div>
    </div>
  </div>
);
