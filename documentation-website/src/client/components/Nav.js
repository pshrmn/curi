import React from 'react';
import { Link } from '@curi/react';
import styleActive from '../utils/styleActive';

export default () => (
  <nav>
    <ul>
      <li>
        <Link to="Home" className="home-link">
          Curi
        </Link>
      </li>
      <li>
        <Link to="Packages" active={{ merge: styleActive, partial: true }}>
          Packages
        </Link>
      </li>
      <li>
        <Link
          to="Tutorial"
          params={{ name: '01-introduction' }}
          active={{ merge: styleActive }}
        >
          Tutorial
        </Link>
      </li>
      <li>
        <Link
          to="Guide"
          params={{ slug: 'getting-started' }}
          active={{ merge: styleActive, partial: true }}
        >
          Guides
        </Link>
      </li>
      <li>
        <Link to="Examples" active={{ merge: styleActive, partial: true }}>
          Examples
        </Link>
      </li>
      <li>
        <a href="https://github.com/pshrmn/curi">GitHub</a>
      </li>
    </ul>
  </nav>
);
