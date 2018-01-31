import Home from "./components/Home";
import Contact from "./components/Contact";
import Method from "./components/Method";
import NotFound from "./components/NotFound";

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
    name: "Contact",
    path: "contact",
    match: {
      response: ({ set }) => {
        set.body(Contact);
      }
    },
    children: [
      {
        name: "Method",
        path: ":method",
        match: {
          response: ({ set }) => {
            set.body(Method);
          }
        }
      }
    ]
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
