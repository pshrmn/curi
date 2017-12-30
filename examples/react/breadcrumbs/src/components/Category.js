import React from 'react';
import { Link, curious } from '@curi/react';
import Breadcrumbs from './Breadcrumbs';

const Category = ({ params, data:products, router }) => (
  <div>
    <Breadcrumbs name='Category' params={params} />
    <h1>{params.category}</h1>
    <p>List of products</p>
    <ul>
      {
        products.map(p => {
          const productParams = {...params, productID: p.id}
          return (
            <li key={p.id}>
              <Link to='Product' params={productParams}>
                {router.addons.title('Product', { name: p.name })}
              </Link>
            </li>
          );
        })
      }
    </ul>
  </div>
);

export default curious(Category);
