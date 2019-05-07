import { prepareRoutes } from "@curi/router";

import Home from "./components/Home";
import Contact from "./components/Contact";
import Method from "./components/Method";
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
    name: "Contact",
    path: "contact",
    respond: () => {
      return {
        body: Contact
      };
    },
    children: [
      {
        name: "Method",
        path: ":method",
        respond: () => {
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
    respond: () => {
      return {
        body: NotFound
      };
    }
  }
]);
