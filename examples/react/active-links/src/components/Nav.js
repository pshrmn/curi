import React from 'react';
import { Link } from '@curi/react';

const merge = (props) => {
  props.className = 'active';
  return props;
}

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to='Home' active={{ merge }}>Home</Link>
      </li>
      <li>
        <Link to='Contact' active={{ merge, partial: true }}>Contact</Link>
        <ul>
          <li>
            <Link
              to='Method'
              active={{ merge }}
              params={{ method: 'phone' }}
            >
              By Phone
            </Link>
          </li>
          <li>
            <Link
              to='Method'
              active={{ merge }}
              params={{ method: 'email' }}
            >
              By Email
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default Nav;
