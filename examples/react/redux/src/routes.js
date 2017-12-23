import Home from './components/Home';
import Product from './components/Product';
import NotFound from './components/NotFound';

import fakeData from './fakeData';
import store, { loadProducts, loadProduct } from './reduxStuff';

export default [
  {
    name: 'Home',
    path: '',
    match: {
      response: ({ set }) => {
        store.dispatch(
          loadProducts(fakeData)
        );
        set.body(Home);
      }
    }
  },
  {
    name: 'Product',
    path: 'products/:id',
    match: {
      response: ({ route, set }) => {
        set.body(Product);

        const { id } = route.params;
        // "cache"
        const existing = store.getState();
        if (!existing[id]) {
          const product = fakeData[id];
          if (product) {
            store.dispatch(
              loadProduct(product)
            );
          }
        }
      }
    }
  },
  {
    name: 'Not Found',
    path: '(.*)',
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    }
  }
];
