export default [
  {
    name: "Home",
    path: "",
    match: {
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
    match: {
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
        match: {
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
    name: "Not Found",
    path: "(.*)",
    match: {
      body: () =>
        import("./components/NotFound.js").then(module => module.default)
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
      };
    }
  }
];
