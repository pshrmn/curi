import React from 'react';
import { Link } from 'curi-react';

const Nav = () => (
  <nav>
    <ul>
      <li><Link name='Home'>Home</Link></li>
      <li>
        Paints
        <ol>
          <li>
            <Link
              name='Product'
              params={{ color: 'DarkSlateBlue' }}
              to={{ state: { name: 'Dark Slate Blue' } }}
            >
              Dark Slate Blue
            </Link>
          </li>
          <li>
            <Link
              name='Product'
              params={{ color: 'SeaGreen' }}
              to={{ state: { name: 'Sea Green' } }}
            >
              Sea Green
            </Link>
          </li>
          <li>
            <Link
              name='Product'
              params={{ color: 'Indigo' }}
              to={{ state: { name: 'Indigo' } }}
            >
              Indigo
            </Link>
          </li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default Nav;
