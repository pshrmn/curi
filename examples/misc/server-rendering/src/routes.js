import { prepare_routes } from "@curi/router";

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
    },
    children: [
      {
        name: "Contact Method",
        path: ":method",
        resolve() {
          return import("./components/Method.js").then(
            module => module.default
          );
        },
        response: ({ resolved }) => {
          return {
            body: resolved
          };
        }
      }
    ]
  },
  {
    name: "Redirect",
    path: "redirect",
    response: () => {
      return {
        redirectTo: {
          name: "Home"
        }
      };
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    resolve() {
      return import("./components/NotFound.js").then(module => module.default);
    },
    response: ({ resolved }) => {
      return {
        body: resolved
      };
    }
  }
]);
