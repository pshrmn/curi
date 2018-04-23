import Home from "./components/Home";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

export default [
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: Home
      };
    }
  },
  {
    name: "Product",
    path: "products/:id",
    response() {
      return {
        body: Product
      };
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    response() {
      return {
        body: NotFound
      };
    }
  }
];
