import Home from './components/Home';
import Product from './components/Product';
import NotFound from './components/NotFound';

import fakeData from './fakeData';
import store, { loadProducts, loadProduct } from './reduxStuff';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home,
    load: () => {
      store.dispatch(
        loadProducts(fakeData)
      );
    }
  },
  {
    name: 'Product',
    path: 'products/:id',
    body: () => Product,
    load: ({ params }, mods) => {
      const { id } = params;
      // "cache"
      const existing = store.getState();
      if (existing[id]) {
        return;
      }

      const product = fakeData[id];
      if (product) {
        store.dispatch(
          loadProduct(product)
        );
      } else {
        mods.setStatus(404);
      }
    }
  },
  {
    name: 'Not Found',
    path: '(.*)',
    body: () => NotFound
  }
];
