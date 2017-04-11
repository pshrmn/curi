import React from 'react';
import Link from 'curi-react/src/Link';

const Nav = () => (
  <nav>
    <ul>
      <li><Link name='Home'>Home</Link></li>
      <li>
        <Link name='Contact'>Contact</Link>
        <ol>
          <li><Link name='Contact Method' params={{ method: 'phone'}}>By Phone</Link></li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default Nav;
