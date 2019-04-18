import { prepareRoutes } from "@curi/router";

import Home from "./components/Home";
import Contact from "./components/Contact";
import Method from "./components/Method";
import NotFound from "./components/NotFound";

export default prepareRoutes({
  routes: [
    {
      name: "Home",
      path: "",
      respond: () => {
        return {
          body: Home,
          meta: {
            title: "Home"
          }
        };
      }
    },
    {
      name: "Contact",
      path: "contact",
      respond: () => {
        return {
          body: Contact,
          meta: {
            title: "Contact"
          }
        };
      },
      children: [
        {
          name: "Method",
          path: ":method",
          respond: ({ match }) => {
            return {
              body: Method,
              meta: {
                title: `Contact via ${match.params.method}`
              }
            };
          }
        }
      ]
    },
    {
      name: "Not Found",
      path: "(.*)",
      respond: () => {
        return {
          body: NotFound,
          meta: {
            title: "Not Found"
          }
        };
      }
    }
  ]
});
