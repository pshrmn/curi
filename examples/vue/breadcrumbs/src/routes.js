import { prepareRoutes } from "@curi/router";

import api from "./api";

import Home from "./components/Home";
import Products from "./components/Products";
import Category from "./components/Category";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return {
        redirect: {
          name: "Products"
        },
        body: Home
      };
    }
  },
  {
    name: "Products",
    path: "products",
    respond() {
      return {
        body: Products,
        data: api.categories()
      };
    },
    children: [
      {
        name: "Category",
        path: ":category",
        respond({ match }) {
          let { params } = match;
          let modifiers = {
            body: Category
          };
          let products = api.category(params.category);
          if (products == null) {
            modifiers.error = "Category does not exist";
          } else {
            modifiers.data = products;
          }
          return modifiers;
        },
        extra: {
          title: params => `${params.category || "Category"}`
        },
        children: [
          {
            name: "Product",
            path: ":productID",
            respond: ({ match }) => {
              let { params } = match;
              let modifiers = {
                body: Product
              };
              let product = api.product(params.productID);
              if (!product) {
                modifiers.error = "Product does not exist";
              } else {
                modifiers.data = product;
              }
              return modifiers;
            },
            extra: {
              title: params => `${params.name || "Product"}`
            }
          }
        ]
      }
    ]
  },
  {
    name: "Not Found",
    path: "(.*)",
    respond() {
      return {
        body: NotFound
      };
    }
  }
]);
