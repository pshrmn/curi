import { prepare_routes } from "@curi/router";
import NotFound from "./components/NotFound"; // not splitting this

export default prepare_routes([
  {
    name: "Home",
    path: "",
    resolve() {
      return import("./components/Home.js").then(module => module.default);
    },
    response: ({ resolved }) => {
      return {
        body: resolved
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    resolve() {
      return import("./components/Contact.js").then(module => module.default);
    },
    response: ({ resolved }) => {
      return {
        body: resolved
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
