import { Link } from 'curi-react';

import fakeAuth from '../fakeAuth'

const Nav = () => (
  <nav>
    <ul>
      <li><Link name='Home'>Home</Link></li>
      <li><Link name='Protected'>Protected</Link></li>
      <li>
        {fakeAuth.authenticated()
          ? <Link name='Logout'>Logout</Link>
          : <Link name='Login'>Login</Link>
        }
      </li>
    </ul>
  </nav>
);

export default Nav;
