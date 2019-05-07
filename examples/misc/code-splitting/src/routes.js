import { prepareRoutes } from "@curi/router";
import NotFound from "./components/NotFound"; // not splitting this

export default prepareRoutes([
  {
    name: "Home",
    path: "",
    resolve() {
      return import("./components/Home.js").then(module => module.default);
    },
    respond: ({ resolved }) => {
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
    respond: ({ resolved }) => {
      return {
        body: resolved
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
]);
