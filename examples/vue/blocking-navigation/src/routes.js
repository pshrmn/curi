import { prepareRoutes } from "@curi/router";

import Home from "./components/Home";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

export default prepareRoutes([
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
    name: "Contact",
    path: "contact",
    response() {
      return {
        body: Contact
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
]);
