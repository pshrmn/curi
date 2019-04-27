import { prepareRoutes } from "@curi/router";

import Home from "./components/Home.svelte";
import Contact from "./components/Contact.svelte";
import Method from "./components/Method.svelte";
import NotFound from "./components/NotFound.svelte";

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
