import { prepareRoutes } from "@curi/router";

import Home from "./components/Home.html";
import Contact from "./components/Contact.html";
import Method from "./components/Method.html";
import NotFound from "./components/NotFound.html";

const routes = [
  {
    name: "Home",
    path: "",
    respond() {
      return {
        body: Home
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    respond() {
      return {
        body: Contact
      };
    },
    children: [
      {
        name: "Method",
        path: ":method",
        respond() {
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
    respond() {
      return {
        body: NotFound
      };
    }
  }
];

export default prepareRoutes({ routes });
