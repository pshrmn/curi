import React from 'react';
import { Link } from '@curi/react';

import examples from '../constants/examples';
import styleActive from '../utils/styleActive';

export default () => (
  <ul className='tiles'>
    {
      examples.map(example => (
        <li key={example.slug} className='tile'>
          <Link
            to='Example'
            params={{ slug: example.slug }}
            active={{ merge: styleActive }}
          >
            <h2>{example.name}</h2>
            <p className='description'>{example.description}</p>
          </Link>
        </li>
      ))
    }
  </ul>
);
