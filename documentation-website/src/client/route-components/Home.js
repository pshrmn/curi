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

// wait for the first response to be generated
config.ready().then(response => {
  // and now, you're ready to render
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
          Curi is not just a React router, but React is the most supported rendering library.
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

      <div className='feature reverse'>
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
            <p>
              Use <IJS>config.ready</IJS> to wait for the response object to be created, then
              render using the response object that that resolves with.
            </p>
          </div>
          <PrismBlock lang='javascript'>
            {
`import InMemory from '@hickory/in-memory';

function requestHandler(req, resp) {
  // create a history using the requested location
  const history = InMemory({ locations: [req.url] });
  const config = createConfig(history, routes);

  config.ready().then(response => {
    // render the markup. This will vary based on your
    // rendering library, but here we'll use React
    const markup = renderToString(
      <Navigator
        config={config}
        response={response}
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
