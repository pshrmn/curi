import React from 'react';
import { Link } from 'curi-react';

import guides from '../Guides';
import styleActive from '../utils/styleActive';

export default () => (
  <ul>
    {
      Object.keys(guides)
      .map(key => guides[key])
      .map(guide => (
        <li key={guide.slug}>
          <Link
            to='Guide'
            params={{ slug: guide.slug }}
            active={{ merge: styleActive }}
          >
            {guide.name}
          </Link>
        </li>
      ))
    }
  </ul>
)