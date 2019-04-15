import { prepareRoutes } from "@curi/router";

import Home from "./components/Home";
import Protected from "./components/Protected";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

import fakeAuth from "./fakeAuth";

export default prepareRoutes({
  routes: [
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
      name: "Protected",
      path: "protected",
      response: ({ match }) => {
        if (!fakeAuth.authenticated()) {
          return {
            redirect: {
              name: "Login",
              state: {
                next: {
                  name: match.name,
                  params: match.params
                }
              }
            },
            status: 302
          };
        } else {
          return {
            body: Protected
          };
        }
      }
    },
    {
      name: "Login",
      path: "login",
      response: () => {
        if (fakeAuth.authenticated()) {
          return {
            redirect: {
              name: "Home"
            }
          };
        }
        return {
          body: Login
        };
      }
    },
    {
      name: "Logout",
      path: "logout",
      response: () => {
        if (!fakeAuth.authenticated()) {
          return {
            redirect: {
              name: "Home"
            }
          };
        }
        return {
          body: Logout
        };
      }
    },
    {
      name: "Not Found",
      path: "(.*)",
      response: () => {
        return {
          body: NotFound
        };
      }
    }
  ]
});
