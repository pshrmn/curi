import React from 'react';
import { curious, Link } from 'curi-react';

const Breadcrumbs = ({ name, params, curi }) => (
  <ul className='breadcrumbs'>
    {
      curi.addons.ancestors(name).reverse().map(a => (
        <li key={a}>
          <Link to={a} params={params}>
            {curi.addons.title(a, params)}
          </Link>
        </li>
      ))
    }
  </ul>
);

export default curious(Breadcrumbs);
