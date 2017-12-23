import React from 'react';
import { Link } from '@curi/react';

export default ({ admin, login, logout }) => (
  <nav>
    <ul>
      <li>
        <Link to='Home'>Home</Link>
      </li>
      <li>
        <Link to='About'>About</Link>
      </li>
      { admin && <li><Link to='Admin'>Admin</Link></li> }
      <li>
        {
          admin
            ? <button type='button' onClick={logout}>Logout</button>
            : <button type='button' onClick={login}>Login</button>
        }
      </li>
    </ul>
  </nav>
);
