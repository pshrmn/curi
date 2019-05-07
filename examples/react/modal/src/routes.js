import { prepareRoutes } from "@curi/router";

import Home from "./components/Home";
import Product from "./components/Product";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    respond: () => {
      return {
        body: Home
      };
    }
  },
  {
    name: "Product",
    path: "paint/:color",
    respond: () => {
      return {
        body: Product
      };
    },
    children: [
      {
        name: "Product Detail",
        path: "detail",
        respond: () => {
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
    respond() {
      return {
        body: NotFound
      };
    }
  }
]);
