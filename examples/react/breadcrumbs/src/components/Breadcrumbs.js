import React from 'react';
import { curious, Link } from '@curi/react';

const Breadcrumbs = ({ name, params, router }) => (
  <ul className='breadcrumbs'>
    {
      router.addons.ancestors(name).reverse().map(a => (
        <li key={a}>
          <Link to={a} params={params}>
            {router.addons.title(a, params)}
          </Link>
        </li>
      ))
    }
  </ul>
);

export default curious(Breadcrumbs);
