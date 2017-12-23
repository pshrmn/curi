import React from 'react';
import { Link } from '@curi/react';

const Nav = () => (
  <nav>
    <ul>
      <li><Link to='Home'>Home</Link></li>
      <li>
        Paints
        <ol>
          <li>
            <Link
              to='Product'
              params={{ color: 'DarkSlateBlue' }}
              details={{ state: { name: 'Dark Slate Blue' } }}
            >
              Dark Slate Blue
            </Link>
          </li>
          <li>
            <Link
              to='Product'
              params={{ color: 'SeaGreen' }}
              details={{ state: { name: 'Sea Green' } }}
            >
              Sea Green
            </Link>
          </li>
          <li>
            <Link
              to='Product'
              params={{ color: 'Crimson' }}
              details={{ state: { name: 'Crimson' } }}
            >
              Crimson
            </Link>
          </li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default Nav;
