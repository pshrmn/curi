import { buildRoutes } from "@curi/router";

import Home from "./components/Home";
import Protected from "./components/Protected";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

import store from "./store";

export default buildRoutes([
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
    name: "Protected",
    path: "protected",
    response() {
      if (!store.state.user) {
        return {
          redirectTo: {
            name: "Login",
            query: { next: "/protected" }
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
    response() {
      if (store.state.user) {
        return {
          redirectTo: {
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
    response() {
      if (!store.state.user) {
        return {
          redirectTo: {
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
    response() {
      return {
        body: NotFound
      };
    }
  }
]);
