import React from 'react';
import { Link } from 'curi-react';

const Nav = () => (
  <nav>
    <ul>
      <li><Link to='Home'>Home</Link></li>
      <li>
        <Link to='Contact'>Contact</Link>
        <ol>
          <li><Link to='Contact Method' params={{ method: 'phone'}}>By Phone</Link></li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default Nav;
