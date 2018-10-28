import { buildRoutes } from "@curi/router";

import Home from "./components/Home";
import Contact from "./components/Contact";

export default buildRoutes([
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
    }
  }
]);
