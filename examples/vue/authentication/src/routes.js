import Home from "./components/Home";
import Protected from "./components/Protected";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

import store from "./store";

export default [
  {
    name: "Home",
    path: "",
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: "Protected",
    path: "protected",
    match: {
      response: ({ set }) => {
        if (!store.state.user) {
          set.redirect(
            {
              name: "Login",
              query: { next: "/protected" }
            },
            302
          );
        } else {
          set.body(Protected);
        }
      }
    }
  },
  {
    name: "Login",
    path: "login",
    match: {
      response: ({ set }) => {
        if (store.state.user) {
          set.redirect({
            name: "Home"
          });
        } else {
          set.body(Login);
        }
      }
    }
  },
  {
    name: "Logout",
    path: "logout",
    match: {
      response: ({ set }) => {
        if (!store.state.user) {
          set.redirect({
            name: "Home"
          });
        } else {
          set.body(Logout);
        }
      }
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    }
  }
];
