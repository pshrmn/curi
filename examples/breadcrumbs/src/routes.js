import api from './api';

import Home from './components/Home';
import Products from './components/Products';
import Category from './components/Category';
import Product from './components/Product';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home,
    load: (params, location, mods, addons) => {
      const pathname = addons.pathname('Products');
      mods.redirect(pathname);
    }
  },
  {
    name: 'Products',
    path: 'products',
    body: () => Products,
    load: (params, location, mods) => {
      mods.setData(api.categories());
    },
    children: [
      {
        name: 'Category',
        path: ':category',
        body: () => Category,
        load: (params, location, mods) => {
          const products = api.category(params.category);
          if (products == null) {
            return Promise.reject('Category does not exist');
          }
          mods.setData(products);
        },
        title: (params) => `${params.category || 'Category'}`,
        children: [
          {
            name: 'Product',
            path: ':productID',
            body: () => Product,
            load: (params, location, mods) => {
              const product = api.product(params.productID);
              if (!product) {
                return Promise.reject('Product does not exist');
              }
              mods.setData(product);
            },
            title: (params) => `${params.name || 'Product'}`
          }
        ]
      }
    ]
  }
];
