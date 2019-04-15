import { prepareRoutes } from "@curi/router";
import ancestors from "@curi/route-ancestors";

import api from "./api";
import title from "./titleInteraction";

import Home from "./components/Home";
import Products from "./components/Products";
import Category from "./components/Category";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

export default prepareRoutes({
  routes: [
    {
      name: "Home",
      path: "",
      response() {
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
      response() {
        return {
          body: Products,
          data: api.categories()
        };
      },
      children: [
        {
          name: "Category",
          path: ":category",
          response({ match }) {
            const { params } = match;
            const modifiers = {
              body: Category
            };
            const products = api.category(params.category);
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
              response: ({ match }) => {
                const { params } = match;
                const modifiers = {
                  body: Product
                };
                const product = api.product(params.productID);
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
      response() {
        return {
          body: NotFound
        };
      }
    }
  ],
  interactions: [ancestors(), title()]
});
