import React from 'react';
import { Link } from '@curi/react';

export const NotFound = () => {
  return (
    <div>
      The requested page could not be found :(.
    </div>  
  );
};

export const NotFoundMenu = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='Home'>Home</Link>
        </li>
      </ul>
    </nav>
  );
};
