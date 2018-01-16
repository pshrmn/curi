import Home from "./components/Home";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

export default [
  {
    name: "Home",
    path: "",
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: "Product",
    path: "products/:id",
    match: {
      response: ({ route, set }) => {
        set.body(Product);
      }
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    }
  }
];
