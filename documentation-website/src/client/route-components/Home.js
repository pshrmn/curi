import React from 'react';
import {PrismCode} from 'react-prism';
import { Link } from 'curi-react';

export default () => (
  <div>
    <div className='banner'>
      <h1>Curi</h1>
      <p>
        A single page application router for any JavaScript rendering library.
      </p>
    <PrismCode
        className='language-javascript'
        component='pre'
      >
      {
`import \{ Browser \} from 'hickory';
import createConfig from 'curi';

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
config.ready().then((response) => {
  // and now, you're ready to render
});`
      }
    </PrismCode>
    <p>
      Ready to learn more? Check out the{' '}
      <Link to='Guide' params={{ slug: 'getting-started' }}>getting started</Link> guide.
    </p>
    </div>
  </div>
);
