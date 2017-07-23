import React from 'react';
import { Link } from 'curi-react';

import examples from '../Examples';
import styleActive from '../utils/styleActive';

export default () => (
  <ul>
    {
      Object.keys(examples)
      .map(key => examples[key])
      .map(example => (
        <li key={example.slug}>
          <Link
            to='Example'
            params={{ slug: example.slug }}
            active={{ merge: styleActive }}
          >
            {example.name}
          </Link>
        </li>
      ))
    }
  </ul>
);
