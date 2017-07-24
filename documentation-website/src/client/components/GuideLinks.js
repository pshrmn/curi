import React from 'react';
import { Link } from 'curi-react';

import guides from '../constants/guides';
import styleActive from '../utils/styleActive';

export default ({ withDescription = false }) => (
  <ul className='link-list'>
    {
      guides.map(guide => (
        <li key={guide.slug} className={withDescription ? 'with' : 'solo'}>
          <Link
            to='Guide'
            params={{ slug: guide.slug }}
            active={{ merge: styleActive }}
          >
            {guide.name}
          </Link>
          {withDescription && guide.description}
        </li>
      ))
    }
  </ul>
);
