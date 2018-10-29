import { prepareRoutes } from "@curi/router";

import { Home, HomeMenu } from "./components/Home";
import { Contact, ContactMenu } from "./components/Contact";
import { Method, MethodMenu } from "./components/Method";
import { NotFound, NotFoundMenu } from "./components/NotFound";

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: {
          Main: Home,
          Menu: HomeMenu
        }
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    response() {
      return {
        body: {
          Main: Contact,
          Menu: ContactMenu
        }
      };
    },
    children: [
      {
        name: "Method",
        path: ":method",
        response() {
          return {
            body: {
              Main: Method,
              Menu: MethodMenu
            }
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
        body: {
          Main: NotFound,
          Menu: NotFoundMenu
        }
      };
    }
  }
]);
