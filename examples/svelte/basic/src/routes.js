import Home from "./components/Home.html";
import Contact from "./components/Contact.html";
import Method from "./components/Method.html";
import NotFound from "./components/NotFound.html";

const routes = [
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
    name: "Contact",
    path: "contact",
    response() {
      return {
        body: Contact
      };
    },
    children: [
      {
        name: "Method",
        path: ":method",
        response() {
          return {
            body: Method
          };
        }
      }
    ]
  },
  {
    name: "NotFound",
    path: "(.*)",
    response() {
      return {
        body: NotFound
      };
    }
  }
];

export default routes;
