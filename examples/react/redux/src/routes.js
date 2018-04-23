import Home from "./components/Home";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

import fakeData from "./fakeData";
import store, { loadProducts, loadProduct } from "./reduxStuff";

export default [
  {
    name: "Home",
    path: "",
    response() {
      store.dispatch(loadProducts(fakeData));
      return {
        body: Home
      };
    }
  },
  {
    name: "Product",
    path: "products/:id",
    response: ({ params }) => {
      // "cache"
      const existing = store.getState();
      if (!existing[params.id]) {
        const product = fakeData[params.id];
        if (product) {
          store.dispatch(loadProduct(product));
        }
      }
      return {
        body: Product
      };
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    response: () => {
      return {
        body: NotFound
      };
    }
  }
];
