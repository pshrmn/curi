import api from './api';

import Home from './components/Home';
import Products from './components/Products';
import Category from './components/Category';
import Product from './components/Product';

export default [
  {
    name: 'Home',
    path: '',
    value: Home
  },
  {
    name: 'Products',
    path: 'products',
    value: Products,
    load: (params, resp) => {
      resp.setData(api.categories());
    },
    children: [
      {
        name: 'Category',
        path: ':category',
        value: Category,
        load: (params, resp) => {
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
            value: Product,
            load: (params, resp) => {
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
