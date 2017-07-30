import React from 'react';
import { Link } from '@curi/react';
import NProgress from 'nprogress';

// when the user clicks on one of the prefetch links, start the progress bar
const onClick = () => {
  NProgress.start();
}

const Nav = () => (
  <nav>
    <ul>
      <li><Link to='Home'>Home</Link></li>
      <li>
        <Link
          to='Album'
          params={{ id: 1 }}
          onClick={onClick}
        >
          Album 1
        </Link>
      </li>
      <li>
        <Link
          to='Album'
          params={{ id: 2 }}
          onClick={onClick}
        >
          Album 2
        </Link>
      </li>
      <li>
        <Link
          to='Album'
          params={{ id: 3 }}
          onClick={onClick}
        >
          Album 3
        </Link>
      </li>
      <li>
        <Link
          to='Album'
          params={{ id: 4 }}
          onClick={onClick}
        >
          Album 4
        </Link>
      </li>
      <li>
        <Link
          to='Album'
          params={{ id: 5 }}
          onClick={onClick}
        >
          Album 5
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
