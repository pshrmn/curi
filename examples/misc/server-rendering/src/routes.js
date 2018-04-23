export default [
  {
    name: "Home",
    path: "",
    on: {
      initial: () =>
        import("./components/Home.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.initial
      };
    }
  },
  {
    name: "Contact",
    path: "contact",
    on: {
      initial: () =>
        import("./components/Contact.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.initial
      };
    },
    children: [
      {
        name: "Contact Method",
        path: ":method",
        on: {
          initial: () =>
            import("./components/Method.js").then(module => module.default)
        },
        response: ({ resolved }) => {
          return {
            body: resolved.initial
          };
        }
      }
    ]
  },
  {
    name: "Not Found",
    path: "(.*)",
    on: {
      initial: () =>
        import("./components/NotFound.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.initial
      };
    }
  }
];
