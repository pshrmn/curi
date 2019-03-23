import { prepare_routes } from "@curi/router";

import Home from "./components/Home.html";
import Protected from "./components/Protected.html";
import Login from "./components/Login.html";
import Logout from "./components/Logout.html";
import NotFound from "./components/NotFound.html";

import fakeAuth from "./fakeAuth";

export default prepare_routes([
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
          redirectTo: {
            name: "Login",
            query: { next: match.location.pathname }
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
          redirectTo: {
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
          redirectTo: {
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
]);
