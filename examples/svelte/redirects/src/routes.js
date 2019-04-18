import { prepareRoutes } from "@curi/router";

import Home from "./components/Home.html";
import Protected from "./components/Protected.html";
import Login from "./components/Login.html";
import Logout from "./components/Logout.html";
import NotFound from "./components/NotFound.html";

import fakeAuth from "./fakeAuth";

export default prepareRoutes({
    routes: [
  {
    name: "Home",
    path: "",
    respond: () => {
      return {
        body: Home
      };
    }
  },
  {
    name: "Protected",
    path: "protected",
    respond: ({ match }) => {
      if (!fakeAuth.authenticated()) {
        return {
          redirect: {
            name: "Login",
            query: { next: match.location.pathname }
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
    respond: () => {
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
    respond: () => {
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
    respond: () => {
      return {
        body: NotFound
      };
    }
  }
]
});
