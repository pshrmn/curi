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
    <div className="features">
      <div className="feature">
        <h3>Frameworks</h3>

        <p>
          While Curi is a generic router, it also provides packages to integrate
          with popular frameworks.
        </p>
        <ul>
          <li>
            <Link to="Package" params={{ package: 'react' }}>
              React
            </Link>
          </li>
          <li>
            <Link to="Package" params={{ package: 'vue' }}>
              Vue
            </Link>
          </li>
          <li>
            <Link to="Package" params={{ package: 'svelte' }}>
              Svelte
            </Link>
          </li>
        </ul>
      </div>

      <div className="feature">
        <h3>Responses</h3>
        <p>
          <Link to="Guide" params={{ slug: 'responses' }}>
            Response objects
          </Link>{' '}
          are used to describe the route that matches a location. These can
          easily be customized to fit your needs.
        </p>
      </div>

      <div className="feature">
        <h3>Route Matching</h3>
        <p>
          Curi uses{' '}
          <a href="https://github.com/pillarjs/path-to-regexp">
            path-to-regexp
          </a>{' '}
          to define route paths using simple but expressive strings.
        </p>
      </div>

      <div className="feature">
        <h3>Navigation</h3>
        <p>
          Curi uses the{' '}
          <a href="https://github.com/pshrmn/hickory">
            <IJS>hickory</IJS>
          </a>{' '}
          package to make navigation within your application very easy, whether
          it runs in a browser or anywhere else.
        </p>
      </div>

      <div className="feature">
        <h3>Server Side Rendering</h3>
        <p>
          Server side rendering with Curi is pretty much the same as client side
          rendering. The main difference is that you will use an in-memory
          history instead of a browser history.
        </p>
      </div>
    </div>
  </div>
);
