import React from 'react';
import { Link } from '@curi/react';

export const Method = ({ params }) => {
  return (
    <div>
      Please do not contact us by {params.method}.
    </div>  
  );
};

export const MethodMenu = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='Home'>Home</Link>
        </li>
        <li>
          <Link to='Contact'>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
