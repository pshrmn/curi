import { prepare_routes } from "@curi/router";

import Home from "./components/Home";
import Contact from "./components/Contact";
import Method from "./components/Method";
import NotFound from "./components/NotFound";

const routes = [
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
    name: "Contact",
    path: "contact",
    response: () => {
      return {
        body: Contact
      };
    },
    children: [
      {
        name: "Method",
        path: ":method",
        response: () => {
          return {
            body: Method
          };
        }
      }
    ]
  },
  {
    name: "NotFound",
    path: "(.*)",
    response: () => {
      return {
        body: NotFound
      };
    }
  }
];

export default prepare_routes(routes);
