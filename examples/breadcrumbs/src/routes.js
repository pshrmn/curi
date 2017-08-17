import api from './api';

import Home from './components/Home';
import Products from './components/Products';
import Category from './components/Category';
import Product from './components/Product';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Products',
    path: 'products',
    body: () => Products,
    load: (params, location, resp) => {
      resp.setData(api.categories());
    },
    children: [
      {
        name: 'Category',
        path: ':category',
        body: () => Category,
        load: (params, location, resp) => {
          const products = api.category(params.category);
          if (products == null) {
            return Promise.reject('Category does not exist');
          }
          resp.setData(products);
        },
        title: (params) => `${params.category || 'Category'}`,
        children: [
          {
            name: 'Product',
            path: ':productID',
            body: () => Product,
            load: (params, location, resp) => {
              const product = api.product(params.productID);
              if (!product) {
                return Promise.reject('Product does not exist');
              }
              resp.setData(product);
            },
            title: (params) => `${params.name || 'Product'}`
          }
        ]
      }
    ]
  }
];
