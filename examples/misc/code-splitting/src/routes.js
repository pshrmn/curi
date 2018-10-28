import { buildRoutes } from "@curi/router";
import NotFound from "./components/NotFound"; // not splitting this

export default buildRoutes([
  {
    name: "Home",
    path: "",
    resolve: {
      body: () => import("./components/Home.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    resolve: {
      body: () =>
        import("./components/Contact.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
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
