import React from 'react';
import { Link, curious } from '@curi/react';

const Products = ({ data, router }) => (
  <div>
    <h1>Products Page</h1>
    <h2>Categories</h2>
    <ul>
      {
        data.map(category => (
          <li key={category}>
            <Link to='Category' params={{ category }}>
              {router.addons.title('Category', { category })}
            </Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default curious(Products);
