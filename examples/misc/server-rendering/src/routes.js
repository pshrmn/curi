import { buildRoutes } from "@curi/router";

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
    },
    children: [
      {
        name: "Contact Method",
        path: ":method",
        resolve: {
          body: () =>
            import("./components/Method.js").then(module => module.default)
        },
        response: ({ resolved }) => {
          return {
            body: resolved.body
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
    resolve: {
      body: () =>
        import("./components/NotFound.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
      };
    }
  }
]);
