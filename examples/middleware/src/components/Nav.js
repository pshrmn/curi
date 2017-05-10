import React from 'react';
import { Link } from 'curi-react';

const Nav = () => (
  <nav>
    <ul>
      <li><Link details={{ pathname: '/'}}>None</Link></li>
      <li><Link details={{ pathname: '/', search: '?test=ing' }}>Test</Link></li>
      <li><Link details={{ pathname: '/numbers', search: '?one=two&three=four' }}>Numbers</Link></li>
    </ul>
  </nav>
);

export default Nav;
