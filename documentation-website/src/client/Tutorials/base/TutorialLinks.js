import React from 'react';
import { Link } from '@curi/react';

import styleActive from '../../utils/styleActive';
import tutorials from '../../constants/tutorials';

export default () => (
  <ul className='link-list'>
    {
      tutorials.map(tutorial => (
        <li key={tutorial.name} className='solo'>
          <Link
            to='Tutorial'
            params={{ name: tutorial.name }}
            active={{ merge: styleActive }}
          >
            {tutorial.displayName}
          </Link>
        </li>
      ))
    }
  </ul>
);
