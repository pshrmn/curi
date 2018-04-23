import Home from "../components/Home";
import About from "../components/About";
import NotFound from "../components/NotFound";

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
    name: "About",
    path: "about",
    response: () => {
      return {
        body: About
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
