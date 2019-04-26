import { prepareRoutes } from "@curi/router";
import ancestors from "@curi/route-ancestors";

import api from "./api";
import title from "./titleInteraction";

import Home from "./components/Home.svelte";
import Products from "./components/Products.svelte";
import Category from "./components/Category.svelte";
import Product from "./components/Product.svelte";
import NotFound from "./components/NotFound.svelte";

export default prepareRoutes({
  routes: [
    {
      name: "Home",
      path: "",
      respond: () => {
        return {
          body: Home,
          redirect: {
            name: "Products"
          }
        };
      }
    },
    {
      name: "Products",
      path: "products",
      respond: () => {
        return {
          body: Products,
          data: api.categories()
        };
      },
      children: [
        {
          name: "Category",
          path: ":category",
          respond: ({ match }) => {
            const { params } = match;
            const modifiers = {
              body: Category
            };
            const products = api.category(params.category);
            if (products == null) {
              modifiers.error = "Category does not exist";
            }
            {
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
              respond({ match }) {
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
      respond: () => {
        return {
          body: NotFound
        };
      }
    }
  ],
  interactions: [ancestors(), title()]
});
