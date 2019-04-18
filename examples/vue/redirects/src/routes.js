import { prepareRoutes } from "@curi/router";

import Home from "./components/Home";
import Protected from "./components/Protected";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

import store from "./store";

export default prepareRoutes({
  routes: [
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
      name: "Protected",
      path: "protected",
      respond() {
        if (!store.state.user) {
          return {
            redirect: {
              name: "Login",
              query: { next: "/protected" }
            },
            meta: {
              status: 302
            }
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
      respond() {
        if (store.state.user) {
          return {
            redirect: {
              name: "Home"
            }
          };
        } else {
          return {
            body: Login
          };
        }
      }
    },
    {
      name: "Logout",
      path: "logout",
      respond() {
        if (!store.state.user) {
          return {
            redirect: {
              name: "Home"
            }
          };
        } else {
          return {
            body: Logout
          };
        }
      }
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
  ]
});
