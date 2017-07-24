import React from 'react';
import { Link } from 'curi-react';

import examples from '../constants/examples';
import styleActive from '../utils/styleActive';

export default ({ withDescription = false }) => (
  <ul className='link-list'>
    {
      examples.map(example => (
        <li key={example.slug} className={withDescription ? 'with' : 'solo'}>
          <Link
            to='Example'
            params={{ slug: example.slug }}
            active={{ merge: styleActive }}
          >
            {example.name}
          </Link>
          { withDescription && <p>{example.description}</p> }
        </li>
      ))
    }
  </ul>
);
