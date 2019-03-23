import { prepare_routes } from "@curi/router";

import Home from "./components/Home";
import Product from "./components/Product";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

export default prepare_routes([
  {
    name: "Home",
    path: "",
    response: () => {
      return {
        body: Home
      };
    }
  },
  {
    name: "Product",
    path: "paint/:color",
    response: () => {
      return {
        body: Product
      };
    },
    children: [
      {
        name: "Product Detail",
        path: "detail",
        response: () => {
          return {
            body: Detail
          };
        }
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
]);
