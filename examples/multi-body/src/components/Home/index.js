import React from 'react';
import { Link } from '@curi/react';

export const Home = () => {
  return (
    <div>
      Home.
    </div>  
  );
};

export const HomeMenu = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='Contact'>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
