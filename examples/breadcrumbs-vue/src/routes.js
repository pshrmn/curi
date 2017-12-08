import api from './api';

import Home from './components/Home';
import Products from './components/Products';
import Category from './components/Category';
import Product from './components/Product';

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set, addons }) => {
        const pathname = addons.pathname('Products');
        set.redirect(pathname);
        set.body(Home);
      }
    }
  },
  {
    name: 'Products',
    path: 'products',
    match: {
      response: ({ set }) => {
        set.body(Products);
        set.data(api.categories());
      }
    },
    children: [
      {
        name: 'Category',
        path: ':category',
        match: {
          response: ({ route, set }) => {
            set.body(Category);
            const products = api.category(route.params.category);
            if (products == null) {
              set.error('Category does not exist');
            } else {
              set.data(products);
            }
          }
        },
        extra: {
          title: (params) => `${params.category || 'Category'}`
        },
        children: [
          {
            name: 'Product',
            path: ':productID',
            match: {
              response: ({ route, set }) => {
                set.body(Product);
                const product = api.product(route.params.productID);
                if (!product) {
                  set.error('Product does not exist');
                } else {
                  set.data(product);
                }
              }
            },
            extra: {
              title: (params) => `${params.name || 'Product'}`
            }
          }
        ]
      }
    ]
  }
];
