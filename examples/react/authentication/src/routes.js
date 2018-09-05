import Home from "./components/Home";
import Protected from "./components/Protected";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

import fakeAuth from "./fakeAuth";

export default [
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
];
