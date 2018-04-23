import Home from "./components/Home";
import Contact from "./components/Contact";
import Method from "./components/Method";
import NotFound from "./components/NotFound";

export default [
  {
    name: "Home",
    path: "",
    response: () => {
      return {
        body: Home,
        title: "Home"
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    response: () => {
      return {
        body: Contact,
        title: "Contact"
      };
    },
    children: [
      {
        name: "Method",
        path: ":method",
        response: ({ params }) => {
          return {
            body: Method,
            title: `Contact via ${params.method}`
          };
        }
      }
    ]
  },
  {
    name: "Not Found",
    path: "(.*)",
    response: () => {
      return {
        body: NotFound,
        title: "Not Found"
      };
    }
  }
];
