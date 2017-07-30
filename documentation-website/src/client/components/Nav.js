import React from 'react';
import { Link } from '@curi/react';

export default () => (
  <nav>
    <ul>
      <li>
        <Link to='Home' className='home-link'>Curi</Link>
      </li>
      <li>
        <Link to='Packages'>Packages</Link>
      </li>
      <li>
        <Link to='Guide' params={{ slug: 'getting-started' }}>Guides</Link>
      </li>
      <li>
        <Link to='Examples'>Examples</Link>
      </li>
      <li>
        <a href="https://github.com/pshrmn/curi">GitHub</a>
      </li>
    </ul>
  </nav>
);
